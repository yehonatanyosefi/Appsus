import { mailService } from "../services/mail.service.js"
export default {
     props: ['mails'],
     template: `
     <section className="mail-list">
          <ul>
               <li></li>
          </ul>
     </section>
     {{mail}}
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

     },
}