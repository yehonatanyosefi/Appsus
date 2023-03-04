import { mailService } from "../services/mail.service.js"
import MailPreview from '../cmps/MailPreview.js'


export default {
     props: ['mails'],
     template: `
     <section className="mail-list">
          <h3 class="flex"><i class="fa-solid fa-inbox"></i> Primary</h3>
          <ul class="clean-list">
               <li v-for="mail in mails" :key="mail.id" >
                    <MailPreview @starMail="starMail" :mail="mail" @removeMail="remove"  @changeIsRead="changeIsRead" @click="changeIsRead(true,mail.id)"/>
                    <!-- <MailPreview @starMail="starMail" :mail="mail" @removeMail="remove"  @changeIsRead="changeIsRead" /> -->
               </li>
          </ul>
     </section>
     `,
     data() {
          return {
               // mail: null,
          }
     },
     methods: { 
          remove(mailId) {
               this.$emit('removeMail', mailId)
           },
           changeIsRead(isRead,mailId){
               this.$emit('changeIsRead',isRead, mailId)
           },
           starMail(isStared,mailId){
               this.$emit('starMail',isStared,mailId)
           }
     },
     computed: {
          
     },
     created() {
          // mailService.query()
          //      .then(mail => this.mail = mail)

     },
     components: {
          MailPreview
     },
}