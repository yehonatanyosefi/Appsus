import { mailService } from '../services/mail.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    props: [''],
    template: `
        <section class="compose-mail" :class="open">
            <header class="flex justify-between">
                <h3>New Message</h3>
                <div className="window-buttons">
                    <button class="minimize" title="Minimize"><i class="fa-regular fa-window-minimize"></i></button>
                    <button class="full-screen" title="Full screen"><i class="fa-solid fa-up-right-and-down-left-from-center"></i></button>
                    <button class="close" @click="close" title="Save & close"><i class="fa-solid fa-xmark"></i></button>
                </div>
            </header>

            <form action="" @submit="send">
            <main class="mail-text">
                <!-- why does the email pattern doesnt work?? -->
                <input v-model="recipient" class="recipient" type="email" placeholder="Recipient"  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" required>

                <input v-model="subject" class="mail-subject" type="text" placeholder="Subject"/>
                <textarea v-model="body" name="" id="" cols="30" rows="10"></textarea>
            </main>

            <section class="send-mail flex justify-between">
                <button type="submit" className="send" >send</button>
                <button type="button" className="delete"><i class="fa-regular fa-trash-can"></i></button>
            </section>
            </form>
            
        </section>
        `,
    computed: {
        open() {
            return { 'open': this.isOpen }
        },
    },
    methods: {
        close() {
            this.isOpen = false
            setTimeout(()=> {
                this.$emit('closeCompose')
            },1500)
        },
        send() {
                this.$emit('addMail', this.subject,this.body ,this.recipient)
                this.close()
          },
          resetVars(){
            this.recipient=''
            this.subject=''
            this.body=''
          }
    },
    components: {
        mailService,
        eventBus,
    },
    created() {
        setTimeout(() => this.isOpen = true, 0)
    },
    data() {
        return {
            isOpen: false,
            recipient:'',
            subject:'',
            body:'',

        }
    }
}
