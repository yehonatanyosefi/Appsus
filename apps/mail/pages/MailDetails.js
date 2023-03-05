import { mailService } from "../services/mail.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'


export default {
     props:['mailId'],
     template: `
     <section className="mail-details" v-if="mail">
          <button class="arrow-btn" @click="back"><i class="fa-solid fa-arrow-left"></i></button>
          <h1 class="subject">{{mail.subject}}</h1>
          <h3 class="username">{{formatUsername}} </h3>
          <div className="mail-details-buttons">

               <!-- <button class="star" ><i class="fa-regular fa-star"></i></button> -->
               <button  @click="star(mail.id)" class="star-btn" v-on:mouseover="hover = true" v-on:mouseout="hover = false">
                    <i class="fa-regular fa-star" v-if="!hover && !mail.isStared"></i> 
                    <i class="fa-solid fa-star" v-else-if="hover || mail.isStared"></i> 
                    <!-- v-html="getSvg('star-svg')"  -->
               </button>

               <!-- <RouterLink :to="{name:'mailDetails',params: {openMail:'openMail'}, query:{user:'Unknown'}}" class="book"> -->
               <!-- <button title="save as a note"><i class="fa-solid fa-paper-plane"></i></button> -->
               <!-- <RouterLink/> -->

               <button title="delete" @click="removeMail(mail.id)"><i class="fa-regular fa-trash-can"></i></button>
          </div>
          <!-- <p class="mail-from">&lt;{{mail.from}}></p> -->
          <p class="mail-from">&lt;{{formatMailFromTo}}></p>
          <pre class="mail-body">{{mail.body}}</pre>
          <!-- <pre>{{mail}}</pre> -->
     </section>
`,
     data() {
          return {
               mail:null,
               username:null,
               hover: false,
               stared:null
          }
     },
     methods: {
          removeMail(mailId) {
               mailService.remove(mailId)
                   .then(() => {
                    console.log('removing');
                       
                       showSuccessMsg('Mail deleted successfully')
                   })
                   .catch(err=>{
                    showErrorMsg('Could not delete mail')
                   })
           },
           back(){
               this.$emit('back')

           },
           star(mailId){
               console.log('this.stared',this.stared)
               this.stared = !this.stared
               this.$emit('starMail',this.stared,mailId)
          },
     },
     watch:{
          stared: function() {
               this.mail.isStared = this.stared
             }
     },
     computed: {
          formatUsername(){
               const username = (this.mail.from !== 'user@appsus.com') ? this.mail.from.split("@")[0]:this.mail.to.split("@")[0]

               // const username = this.mail.from.split("@")[0]
               return this.username=username
          },
          formatMailFromTo(){
               return (this.mail.from !== 'user@appsus.com') ? this.mail.from:this.mail.to

          }
     },
     created() {
          // const {mailId} = this.$route.params
        if (this.mailId) {
            mailService.get(this.mailId)
                .then(mail => {
                    // this.$emit('changeIsRead',true, mailId)
                    // mail.isRead=true
                    this.mail = mail
                    this.stared=this.mail.isStared
               })
        }
     },
     components: {

     },
}