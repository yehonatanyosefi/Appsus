import { i18Service } from "../../../services/i18n.service.js"
import { svgService } from "../../../services/svg.service.js"


export default {
     props: ['mail'],
     template: `
     <section  class="mail-preview" :class="formatReadMail"  >
               <input type="checkbox" />

               <button  @click.stop="star(mail.id)" class="star-btn" v-on:mouseover="hover = true" v-on:mouseout="hover = false">
                    <i class="fa-regular fa-star" v-if="!hover && !mail.isStared"></i> 
                    <i class="fa-solid fa-star" v-else-if="hover || mail.isStared"></i> 
                    <!-- v-html="getSvg('star-svg')"  -->
               </button>
               <!-- <button class="star-btn"><i class="fa-regular fa-star"></i></button>  -->

               <p>{{formatUsername}}</p>
               <p class="mail-body">{{mail.body}}</p>
               <p class="time">{{formatTime}}</p>
               <div class="hover-buttons flex" > 
                    <button @click.stop="remove(mail.id)"><i class="fa-regular fa-trash-can"></i></button>
                    <button v-if="mail.isRead" @click.stop="changeIsRead(false,mail.id)"><i class="fa-regular fa-envelope"></i></button>
                    <button v-else><i class="fa-regular fa-envelope-open" @click.stop="changeIsRead(true,mail.id)"></i></button>
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
               stared:this.mail.isStared
          }
     },
     methods: {
          remove(mailId) {
               this.$emit('removeMail', mailId)
           },
           changeIsRead(isRead,mailId){
               this.$emit('changeIsRead',isRead, mailId)
           },
          star(mailId){
               this.stared = !this.stared
               this.$emit('starMail',this.stared,mailId)
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
         
     },
     created() {
          
     },
     
     components: {
          i18Service,
     },
}