import MailList from '../cmps/MailList.js'
import MailDetails from '../pages/MailDetails.js'
import ComposeMail from '../cmps/ComposeMail.js'
import MailFilter from '../cmps/MailFilter.js'
import { mailService } from '../services/mail.service.js'
import {
  showSuccessMsg,
  showErrorMsg,
} from '../../../services/event-bus.service.js'
import { svgService } from '../../../services/svg.service.js'

export default {
  template: `
     <section className="mail-index">
     <header class="mail-header flex justify-between">
          <section class="toggle-logo flex">
               <button class="toggle-menu x fa-solid fa-bars" @click="isShow=!isShow"> </button>
               <a @click="setFilterVal = 'inbox'" class="logo"><img src="../../../assets/img/gmail.png" alt="Appsus" class="logo" /> </a>
               <p @click="setFilterVal = 'inbox'" class="mail">Mail</p>
          </section >
          <MailFilter @filter="setFilterBy" />
          <section class="navUser flex" >
               <nav><button v-html="getSvg('navigator2')" @click="toggleIsNav"></button></nav>

               <nav class="header-nav" v-if="isNav" tabindex="0" @blur="closeNav" ref="navModal">
                         <RouterLink v-for="({path, title, img}, idx) in routes" :to="path" :title="title" :key="idx">
                              <div class="nav-card">
                                   <img :src="img" :title="title" :class="{'profile-nav':path==='/about'}"/>
                              </div>
                         </RouterLink>
                    </nav>

               <img class="user-profile" src="../../../assets/img/dor.jfif">
          </section>
     </header>

     

     <section class="filter-bar flex flex-column align-center">
          <button class="compose-btn" @click="openModal" ><i class="fa-regular fa-pen-to-square" ></i> <span v-show="isShow">Compose</span></button>
          <ComposeMail 
          v-if="isOpen"
          @closeCompose="closeModal"
          @addMail="addMail"
          @removeMail="removeMail"
          />
          
          <button :class="{ 'side-selected': isSelected(1) }" class ="inbox-btn" @click="setFilter('inbox')"><i class="fa-solid fa-inbox"></i><span v-show="isShow">Inbox ({{UnreadCount}})</span></button>
          <button :class="{ 'side-selected': isSelected(2) }" @click="setFilter('unread')"><i class="fa-regular fa-envelope"></i><span v-show="isShow">Unread</span></button>
          <button :class="{ 'side-selected': isSelected(3) }" @click="setFilter('read')"><i class="fa-regular fa-envelope-open"></i><span v-show="isShow">read</span></button>
          <button :class="{ 'side-selected': isSelected(4) }" @click="setFilter('sent')"><i class="fa-solid fa-arrow-right-from-bracket"></i><span v-show="isShow">sent</span></button>
          <button :class="{ 'side-selected': isSelected(5) }" @click="setFilter('drafts')"><i class="fa-regular fa-file"></i><span v-show="isShow">drafts</span></button>
     </section>

     <MailDetails  
     v-if="currMailId" 
     :mailId="currMailId"
     @back="back"/>

     <MailList class="mail-list-comp"
     :mails="filteredMails"
     v-if="mails && !currMailId"
     @removeMail="removeMail" 
     @changeIsRead="changeIsRead"
     @starMail="starMail"
     />
     
     

     </section>

     

     `,
  data() {
    return {
      mails: null,
      isOpen: false,
      unread: 0,
      filterBy: {},
      setFilterVal: 'inbox',
      currMailId: '',
      isShow: true,
      isNav: false,
      routes: [
        { path: '/', title: 'Home', img: '../../../assets/img/logo.png' },
        { path: '/mail', title: 'Mail', img: '../../../assets/img/gmail.png' },
        { path: '/notes', title: 'Notes', img: '../../../assets/img/keep.png' },
        { path: '/book', title: 'Book', img: '../../../assets/img/book.svg' },
        { path: '/about', title: 'About Us', img: '../../../assets/img/dornatan.jpg' },
      ],
    }
  },
  methods: {
    openModal() {
      this.isOpen = true
    },
    closeModal() {
      this.isOpen = false
    },
    addMail(subject, body, recipient, isSent, id) {
      mailService
        .addMail(subject, body, recipient, isSent, id)
        .then((updatedMail) => {
          const idx = this.mails.findIndex((mail) => mail.id === updatedMail.id)
          if (idx < 0) this.mails.push(updatedMail)
          else this.mails.splice(idx, 1, updatedMail)
          isSent
            ? showSuccessMsg('Mail sent')
            : showSuccessMsg('Saved to drafts')
        })
        .catch((err) => {
          showErrorMsg('Could not send mail')
        })
    },
    removeMail(mailId) {
      mailService
        .remove(mailId)
        .then(() => {
          const idx = this.mails.findIndex((mail) => mail.id === mailId)
          this.mails.splice(idx, 1)
          showSuccessMsg('Mail deleted successfully')
        })
        .catch((err) => {
          showErrorMsg('Could not delete mail')
        })
    },
    setFilterBy(filterBy) {
      this.filterBy = filterBy
    },
    changeIsRead(isRead, mailId) {
      //  this.currMailId = mailId
      mailService.changeIsRead(isRead, mailId).then((updatedMail) => {
        const idx = this.mails.findIndex((mail) => mail.id === updatedMail.id)
        this.mails[idx] = updatedMail
      })
    },
    back() {
      this.currMailId = null
    },
    setFilter(filterBy) {
      console.log('filterBy', filterBy)
      this.setFilterVal = filterBy
      if (this.currMailId) this.currMailId = null
    },
    getSvg(iconName) {
      return svgService.getNoteSvg(iconName)
    },
    toggleIsNav() {
      if (!this.isNav) {
        this.isNav = true
        setTimeout(() => this.$refs.navModal.focus(), 150)
      }
      else this.isNav = false
    },
    closeNav() {
      setTimeout(() => this.isNav = false, 150)
    },
    starMail(isStared, mailId) {
      this.currMailId = mailId
      mailService.changeIsStared(isStared, mailId).then((updatedMail) => {
        const idx = this.mails.findIndex((mail) => mail.id === updatedMail.id)
        this.mails[idx] = updatedMail
      })
    }
  },
  computed: {
    UnreadCount() {
      this.unread = 0
      if (this.mails)
        this.mails.map((mail) => {
          if (!mail.isRead) this.unread++
        })
      return this.unread
    },
    filteredMails() {
      if (!this.mails) return
      let filteredMails = this.mails
      if (this.setFilterVal === 'inbox') {
        filteredMails = filteredMails.filter(
          (mail) => mail.from !== 'user@appsus.com'
        )
        this.buttonSelected = 1
      } else if (this.setFilterVal === 'read') {
        const isRead = true
        filteredMails = filteredMails.filter(
          (mail) => mail.isRead === isRead && mail.from !== 'user@appsus.com'
        )
        this.buttonSelected = 3
      } else if (this.setFilterVal === 'unread') {
        const isRead = false
        filteredMails = filteredMails.filter((mail) => mail.isRead === isRead)
        this.buttonSelected = 2
      } else if (this.setFilterVal === 'sent') {
        filteredMails = filteredMails.filter(
          (mail) => mail.from === 'user@appsus.com' && mail.sentAt !== null
        )
        this.buttonSelected = 4
      } else if (this.setFilterVal === 'drafts') {
        filteredMails = filteredMails.filter((mail) => mail.sentAt === null)
        this.buttonSelected = 5
      }
      if (!this.filterBy.mailTxt) {
        this.filterBy = { mailTxt: '' }
      }
      const regexByName = new RegExp(this.filterBy.mailTxt, 'i')
      return filteredMails.filter(
        (mail) =>
          regexByName.test(mail.from.split('@')[0]) ||
          regexByName.test(mail.body)
      )
    },
    setRoute(route) {
      this.$emit('set-route', route)
    },

  },
  created() {
    mailService.query().then((mails) => {
      this.mails = mails
    })
  },
  mounted() {
    this.unread = 0
  },
  components: {
    MailList,
    ComposeMail,
    MailDetails,
    MailFilter,
  },
}
