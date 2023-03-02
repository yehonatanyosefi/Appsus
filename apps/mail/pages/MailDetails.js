import { mailService } from "../services/mail.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'


export default {
     template: `
     <section className="mail-details" v-if="mail">
          <h1 class="subject">{{mail.subject}}</h1>
          <h3 class="username">{{formatUsername}} </h3>
          <div className="mail-details-buttons">
               <button class="star" ><i class="fa-regular fa-star"></i></button>
               <button title="save as a note"><i class="fa-solid fa-paper-plane"></i></button>
               <button title="delete" @click="removeMail(mail.id)"><i class="fa-regular fa-trash-can"></i></button>
          </div>
          <p class="mail-from">&lt;{{mail.from}}></p>
          <p class="mail-body">{{mail.body}}</p>
          <!-- <pre>{{mail}}</pre> -->
     </section>
`,
     data() {
          return {
               mail:null,
               username:null,
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
     },
     computed: {
          formatUsername(){
               const username = this.mail.from.split("@")[0]
               return this.username=username
          },
     },
     created() {
          const {mailId} = this.$route.params
        if (mailId) {
            mailService.get(mailId)
                .then(mail => {
                    // this.$emit('changeIsRead',true, mailId)
                    // mail.isRead=true
                    this.mail = mail
               })
        }
     },
     components: {

     },
}