import { i18Service } from "../../../services/i18n.service.js"
import LongText from '../cmps/LongText.js'

export default {
     props: ['mail'],
     template: `
     <section  class="mail-preview" :class="formatReadMail">
          <!-- <div :class="formatReadMail"> -->
               <input type="checkbox" />
               <i class="fa-regular fa-star"></i>
               <p>{{formatUsername}}</p>
               <!-- <p>{{mail.body}}</p> -->
               <LongTxt :txt="mail.body" :length="length"/>
               <p>{{formatTime}}</p>
               <div class="hover-buttons flex"> 
                    <button @click.prevent="remove(mail.id)"><i class="fa-regular fa-trash-can"></i></button>
                    <button v-if="mail.isRead" @click.prevent="changeIsRead(false,mail.id)"><i class="fa-regular fa-envelope"></i></button>
                    <button v-else><i class="fa-regular fa-envelope-open" @click.prevent="changeIsRead(true,mail.id)"></i></button>
               </div>
     </section>
     <!-- <pre>{{mail}}</pre> -->
`,
     data() {
          return {
               username:null,
               read:true,
               unread:true,
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
          formatUsername(){
               const username = this.mail.from.split("@")[0]
               return this.username=username
          },
          formatTime(){
               return i18Service.formatTime(this.mail.sentAt)
          },
          formatReadMail(){
               return {'read': !this.mail.isRead }
          }
     },
     created() {

     },
     components: {
          i18Service,
          LongText
     },
}