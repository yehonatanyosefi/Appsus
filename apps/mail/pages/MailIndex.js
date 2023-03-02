import MailList from "../cmps/MailList.js"
import ComposeMail from "../cmps/ComposeMail.js"
import { mailService } from "../services/mail.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'


export default {
     props: [],
     template: `
     <section className="mail-index">
     <header class="mail-header flex justify-between">
          <button class="toggle-menu x fa-solid fa-bars"> </button>
          <div className="logo fa-duotone fa-m">SusMail</div>
          <!-- <button class="logo fa-duotone fa-m">SusMail</button> -->
          <input type="text" placeholder="🔎 Search Mail"/>
          <div className="menu-buttons">
               <button class="apps-menu">apps menu</button>
               <button class="user">User</button>
          </div>
     </header>

     <section class="filter-bar">
          <button @click="openModal" ><i class="fa-regular fa-pen-to-square" ></i> Compose</button>
          <ComposeMail 
          v-if="isOpen"
          @closeCompose="closeModal"
          @addMail="addMail"
          />
          <p>Unread: {{UnreadCount}}</p>
     </section>

     <MailList class="mail-list-comp"
     :mails="mails"
     v-if="mails"
     @removeMail="removeMail" 
     @changeIsRead="changeIsRead"/>
     </section>
     

     `,
     data() {
          return {
               mails:null,
               isOpen:false,
               unread:0,
          }
     },
     methods: {
          openModal(){
               this.isOpen=true
          },
          closeModal(){
                this.isOpen=false
          },
          addMail(subject,body ,recipient){
               mailService
              .addMail(subject,body ,recipient)
              .then((updatedMail) => {
                this.mails.push(updatedMail)
                this.unread=0
                showSuccessMsg('Mail sent')
              })
              .catch((err) => {
               showErrorMsg('Could not send mail')
              })
          },
          removeMail(mailId) {
               mailService.remove(mailId)
                   .then(() => {
                    console.log('hi');
                       const idx = this.mails.findIndex(mail => mail.id === mailId)
                       this.mails.splice(idx, 1)
                       showSuccessMsg('Mail deleted successfully')
                   })
                   .catch(err=>{
                    showErrorMsg('Could not delete mail')
                   })
           },
           setFilterBy(filterBy) {
               this.filterBy = filterBy
           },
          changeIsRead(isRead,mailId){
               mailService.changeIsRead(isRead,mailId)
               //   .then(updatedMail=> {
               //      console.log('isRead',isRead)
               //      console.log('updatedMail',updatedMail)
               //        const idx= this.mails.findIdx(mail===updatedMail)
               //        this.mails[idx].splice(idx,1,updatedMail)
               // })

               // const currMail= this.mails.find(mail=> mail.id===mailId)
               // console.log('currMail',currMail)
               // mailService.save(currMail)
               // .then(updatedMail=>{
               //      const idx= this.mails.findIdx(mail===updatedMail)
               //      this.mails[idx].splice(idx,1,updatedMail)
               // })  
           }
     },
     computed: {
        UnreadCount(){
          if (this.mails) this.mails.map(mail => {
               if (!mail.isRead) this.unread++
          })
          return this.unread
        }
     },
     created() {
          mailService.query()
            .then(mails => this.mails = mails)
     },
     mounted(){
          this.unread=0
     },
     components: {
          MailList,
          ComposeMail,
     },
}