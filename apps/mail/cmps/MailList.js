import { mailService } from "../services/mail.service.js"
import MailPreview from '../cmps/MailPreview.js'


export default {
     props: ['mails'],
     template: `
     <section className="mail-list">
          <ul>
               <li v-for="mail in mails" :key="mail.id">
               <!-- <RouterLink :to="'/mail/details/'+mail.id"> -->
                    <MailPreview :mail="mail"/>
               <!-- </RouterLink>  -->

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