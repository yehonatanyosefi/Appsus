import { i18Service } from "../../../services/i18n.service.js"

export default {
     props: ['mail'],
     template: `
     <section  class="mail-preview" :class="formatReadMail" @click.prevent >
          <!-- <div :class="formatReadMail"> -->
               <input type="checkbox" />
               <button><i class="fa-regular fa-star"></i></button> 
               <p>{{formatUsername}}</p>
               <p class="mail-body">{{mail.body}}</p>
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
               // username:null,
               read:true,
               unread:true,
               length:10,
          }
     },
     methods: {
          remove(mailId) {
               this.$emit('removeMail', mailId)
           },
           changeIsRead(isRead,mailId){
               this.$emit('changeIsRead',isRead, mailId)
           },
          
     },
     computed: {
          formatUsername(){
               return (this.mail.from !== 'user@appsus.com') ? this.mail.from.split("@")[0]:this.mail.to.split("@")[0]  
          },
          formatTime(){
               return i18Service.formatTime(this.mail.sentAt)
          },
          formatReadMail(){
               return {'read': !this.mail.isRead ,
                         'unread':this.mail.isRead
          }
          },
          // read(){
          //      return {'read-mail': this.mail.isRead}
          // }
     },
     created() {
          
     },
     
     components: {
          i18Service,
     },
}