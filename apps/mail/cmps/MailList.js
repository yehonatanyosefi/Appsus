import { mailService } from "../services/mail.service.js"
import MailPreview from '../cmps/MailPreview.js'


export default {
     props: ['mails'],
     template: `
     <section className="mail-list">
          <ul class="clean-list">
               <li v-for="mail in mails" :key="mail.id">
               <RouterLink :to="'/mail/'+mail.id" @click="changeIsRead(true,mail.id)">
                    <MailPreview :mail="mail" @removeMail="remove" />
               </RouterLink> 
               </li>
          </ul>
     </section>
     `,
     data() {
          return {
               mail: null,
          }
     },
     methods: { 
          remove(mailId) {
               this.$emit('removeMail', mailId)
           },
           changeIsRead(isRead,mailId){
               this.$emit('changeIsRead',isRead, mailId)
           }
     },
     computed: {

     },
     created() {
          mailService.query()
               .then(mail => this.mail = mail)

     },
     components: {
          MailPreview
     },
}