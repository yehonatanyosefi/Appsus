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
          <button class="toggle-menu x fa-solid fa-bars"> </button>
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
          <button class="compose-btn" @click="openModal" ><i class="fa-regular fa-pen-to-square" ></i> Compose</button>
          <ComposeMail 
          v-if="isOpen"
          @closeCompose="closeModal"
          @addMail="addMail"
          />
          <!-- <p>Unread: {{UnreadCount}}</p> -->
          <button class ="inbox-btn" @click="setFilter='inbox'">Inbox <span>({{UnreadCount}})</span></button>
          <button @click="setFilter='unread'">Unread</button>
          <button @click="setFilter='read'">read</button>
          <button @click="setFilter='sent'">sent</button>
          <button @click="setFilter='drafts'">drafts</button>
     </section>

     <MailList class="mail-list-comp"
     :mails="filteredMails"
     v-if="mails"
     @removeMail="removeMail" 
     @changeIsRead="changeIsRead"/>
     <MailDetails />
     </section>

     

     `,
  data() {
    return {
      mails: null,
      isOpen: false,
      unread: 0,
      // filterBy: {read:true , unread:true},
      filterBy: {},
      setFilter: 'inbox',
    }
  },
  methods: {
    openModal() {
      this.isOpen = true
    },
    closeModal() {
      this.isOpen = false
    },
    addMail(subject, body, recipient, isSent) {
      mailService
        .addMail(subject, body, recipient, isSent)
        .then((updatedMail) => {
          this.mails.push(updatedMail)
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
      mailService.changeIsRead(isRead, mailId).then((updatedMail) => {
        const idx = this.mails.findIndex((mail) => mail.id === updatedMail.id)
        this.mails[idx] = updatedMail
      })

      // const currMail= this.mails.find(mail=> mail.id===mailId)
      // console.log('currMail',currMail)
      // mailService.save(currMail)
      // .then(updatedMail=>{
      //      const idx= this.mails.findIdx(mail===updatedMail)
      //      this.mails[idx].splice(idx,1,updatedMail)
      // })
    },
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
      let filteredMails = this.mails
      if (this.setFilter === 'inbox')
        filteredMails = filteredMails.filter(
          (mail) => mail.from !== 'user@appsus.com'
        )
      else if (this.setFilter === 'read') {
        const isRead = true
        filteredMails = filteredMails.filter(
          (mail) => mail.isRead === isRead && mail.from !== 'user@appsus.com'
        )
      } else if (this.setFilter === 'unread') {
        const isRead = false
        filteredMails = filteredMails.filter((mail) => mail.isRead === isRead)
      } else if (this.setFilter === 'sent') {
        filteredMails = filteredMails.filter(
          (mail) => mail.from === 'user@appsus.com' && mail.sentAt !== null
        )
      } else if (this.setFilter === 'drafts') {
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
