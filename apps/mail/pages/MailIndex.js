import MailList from "../cmps/MailList.js"
import { mailService } from "../services/mail.service.js"

export default {
     props: [],
     template: `
     <header class="flex justify-between">
          <button class="toggle-menu x fa-solid fa-bars"> </button>
          <div className="logo fa-duotone fa-m">SusMail</div>
          <!-- <button class="logo fa-duotone fa-m">SusMail</button> -->
          <input type="text" placeholder="🔎 Search Mail"/>
          <div className="menu-buttons">
               <button class="apps-menu">apps menu</button>
               <button class="user">User</button>
          </div>
     </header>
     <MailList 
     :mails="mails"
     v-if="mails"/>
     `,
     data() {
          return {
               mails:null,
          }
     },
     methods: {

     },
     computed: {

     },
     created() {
          mailService.query()
            .then(mails => this.mails = mails)
     },
     components: {
          MailList,
     },
}