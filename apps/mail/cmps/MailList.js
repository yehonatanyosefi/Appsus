import { mailService } from "../services/mail.service.js"
export default {
     props: [],
     template: `

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