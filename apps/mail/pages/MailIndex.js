import MailList from '../cmps/MailList.js'
import MailDetails from '../pages/MailDetails.js'
import ComposeMail from '../cmps/ComposeMail.js'
import MailFilter from '../cmps/MailFilter.js'
import { mailService } from '../services/mail.service.js'
import {
  showSuccessMsg,
  showErrorMsg,
} from '../../../services/event-bus.service.js'

export default {
  template: `
     <section className="mail-index">
     <header class="mail-header flex justify-between">
          <button class="toggle-menu x fa-solid fa-bars" @click="isShow=!isShow"> </button>
          <div className="logo fa-duotone fa-m">SusMail</div>
          <!-- <button class="logo fa-duotone fa-m">SusMail</button> -->
          <!-- <input type="text" placeholder="🔎 Search Mail"/> -->
          <MailFilter @filter="setFilterBy" />
          <div className="menu-buttons">
               <button class="apps-menu">apps menu</button>
               <button class="user">User</button>
          </div>
     </header>

     <section class="filter-bar flex flex-column align-center">
          <button class="compose-btn" @click="openModal" ><i class="fa-regular fa-pen-to-square" ></i> <span v-show="isShow">Compose</span></button>
          <ComposeMail 
          v-if="isOpen"
          @closeCompose="closeModal"
          @addMail="addMail"
          @removeMail="removeMail"
          />
          
          <button class ="inbox-btn" @click="setFilter('inbox')"><i class="fa-solid fa-inbox"></i><span v-show="isShow">Inbox ({{UnreadCount}})</span></button>
          <button @click="setFilter('unread')"><i class="fa-regular fa-envelope"></i><span v-show="isShow">Unread</span></button>
          <button @click="setFilter('read')"><i class="fa-regular fa-envelope-open"></i><span v-show="isShow">read</span></button>
          <button @click="setFilter('sent')"><i class="fa-solid fa-arrow-right-from-bracket"></i><span v-show="isShow">sent</span></button>
          <button @click="setFilter('drafts')"><i class="fa-regular fa-file"></i><span v-show="isShow">drafts</span></button>
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
     />
     
     

     </section>

     

     `,
  data() {
    return {
      mails: null,
      isOpen: false,
      unread: 0,
      // filterBy: {read:true , unread:true},
      filterBy: {},
      setFilterVal: 'inbox',
      currMailId:'',
      isShow:true,
    }
  },
  methods: {
    openModal() {
      this.isOpen = true
    },
    closeModal() {
      this.isOpen = false
    },
    addMail(subject, body, recipient, isSent,id) {
      mailService
        .addMail(subject, body, recipient, isSent,id)
        .then((updatedMail) => {
          const idx = this.mails.findIndex((mail) => mail.id === updatedMail.id)
          if (idx<0)  this.mails.push(updatedMail)
          else this.mails.splice(idx,1,updatedMail)
          isSent
            ? showSuccessMsg('Mail sent')
            : showSuccessMsg('Saved to drafts')
        })
        .catch((err) => {
          showErrorMsg('Could not send mail')
        })
    },
    removeMail(mailId) {
      //when deleting fix unread count
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
     this.currMailId= mailId
      mailService.changeIsRead(isRead, mailId).then((updatedMail) => {
        const idx = this.mails.findIndex((mail) => mail.id === updatedMail.id)
        this.mails[idx] = updatedMail
      })
    },
    back(){
     this.currMailId=null
    },
    setFilter(filterBy){
     console.log('filterBy',filterBy)
         this.setFilterVal=filterBy
         if (this.currMailId) this.currMailId=null
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
      if (this.setFilterVal === 'inbox')
        filteredMails = filteredMails.filter(
          (mail) => mail.from !== 'user@appsus.com'
        )
      else if (this.setFilterVal === 'read') {
        const isRead = true
        filteredMails = filteredMails.filter(
          (mail) => mail.isRead === isRead && mail.from !== 'user@appsus.com'
        )
      } else if (this.setFilterVal === 'unread') {
        const isRead = false
        filteredMails = filteredMails.filter((mail) => mail.isRead === isRead)
      } else if (this.setFilterVal === 'sent') {
        filteredMails = filteredMails.filter(
          (mail) => mail.from === 'user@appsus.com' && mail.sentAt !== null
        )
      } else if (this.setFilterVal === 'drafts') {
        filteredMails = filteredMails.filter((mail) => mail.sentAt === null)
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

      // console.log('this.setFilter',this.setFilter)
      // console.log('mails[0][this.setFilter]',this.mails[0][this.setFilter])
      // return this.mails.filter(mail => (this.filterBy[this.setFilter]===mail[this.setFilter]))
    },
  },
  created() {
    mailService.query().then((mails) => {
      this.mails = mails
      console.log('this.mails', this.mails)
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


