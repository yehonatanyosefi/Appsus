import { i18Service } from "../../../services/i18n.service.js"
import { svgService } from "../../../services/svg.service.js"


export default {
     props: ['mail'],
     template: `
     <section  class="mail-preview" :class="formatReadMail" @click.prevent >
          <!-- <div :class="formatReadMail"> -->
               <input type="checkbox" />

               <button :class="formatStarMail" @click="star(!mail.isStared,mail.id)" class="star-btn" v-on:mouseover="hover = true" v-on:mouseout="hover = false">
                    <i class="fa-regular fa-star" v-if="!hover"></i> 
                    <i class="fa-solid fa-star" v-else></i> 
                    <!-- v-html="getSvg('star-svg')"  -->
               </button>
               <!-- <button class="star-btn"><i class="fa-regular fa-star"></i></button>  -->

               <p>{{formatUsername}}</p>
               <p class="mail-body">{{mail.body}}</p>
               <p class="time">{{formatTime}}</p>
               <div class="hover-buttons flex" > 
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
               hover: false,
               stared:false
          }
     },
     methods: {
          remove(mailId) {
               this.$emit('removeMail', mailId)
           },
           changeIsRead(isRead,mailId){
               this.$emit('changeIsRead',isRead, mailId)
           },
          star(isStared,mailId){
               this.$emit('starMail',isStared,mailId)
          },
          getSvg(iconName) {
               return svgService.getNoteSvg(iconName)
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
          formatStarMail(){
                if (this.mail.isStared) return this.stared=true
                else return this.stared=true
          },
         
     },
     created() {
          
     },
     
     components: {
          i18Service,
     },
}