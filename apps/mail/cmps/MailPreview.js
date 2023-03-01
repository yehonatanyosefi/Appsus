import { i18Service } from "../../../services/i18n.service.js"

export default {
     props: ['mail'],
     template: `
     <section class="mail-preview" :class="formatReadMail">
          <!-- <div :class="formatReadMail"> -->
               <input type="checkbox" />
               <i class="fa-regular fa-star"></i>
               <p>{{formatUsername}}</p>
               <p>{{mail.body}}</p>
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
               return this.username=username
          },
          formatTime(){
               return i18Service.formatTime(this.mail.sentAt)
          },
          formatReadMail(){
               return {'read': this.mail.isRead }
          }
     },
     created() {

     },
     components: {
          i18Service
     },
}