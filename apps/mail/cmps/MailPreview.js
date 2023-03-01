import { i18Service } from "../../../services/i18n.service.js"

export default {
     props: ['mail'],
     template: `
     <section className="mail-preview ">
          <input type="checkbox" />
          <i class="fa-regular fa-star"></i>
          <h2>{{formatUsername}}</h2>
          <p>{{mail.body}}</p>
          <!-- <p>{{mail.sentAt}}</p> -->
          <p>{{formatTime}}</p>
     </section>
     <!-- <pre>{{mail}}</pre> -->
`,
     data() {
          return {
               username:null,
          }
     },
     methods: {

     },
     computed: {
          formatUsername(){
               const username = this.mail.from.split("@")[0]
               console.log('username',username)
               console.log('this.username',this.username)
               return this.username=username
          },
          formatTime(){
               return i18Service.formatTime(this.mail.sentAt)
          }
     },
     created() {

     },
     components: {
          i18Service
     },
}