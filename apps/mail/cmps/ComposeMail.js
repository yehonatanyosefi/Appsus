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
                    <button class="close" @click="closeAndSave" title="Save & close"><i class="fa-solid fa-xmark"></i></button>
                </div>
            </header>

            <form action="" @submit="send">
            <main class="mail-text">
                <input @input="saveDraft" v-model="recipient" class="recipient" type="email" placeholder="Recipient"  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" required>

                <input @input="saveDraft" v-model="subject" class="mail-subject" type="text" placeholder="Subject"/>
                <textarea @input="saveDraft" v-model="body" name="" id="" cols="30" rows="10"></textarea>
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
        closeAndSave() {
            this.isOpen = false
            setTimeout(()=> {
                this.$emit('closeCompose')
                this.$emit('addMail', this.subject,this.body ,this.recipient,false)
                clearInterval(this.intervalId)
            },1500)
        },
        saveDraft(){
            this.intervalId = setInterval(()=> {
                if (!this.recipient && !this.subject && !this.body) {
                clearInterval(this.intervalId)
                //todo:/send remove emit to parent
                // mailService.remove(this.emptyMail.id)
                }else{
                //todo:send save emit to parent
                // mailService.save(this.emptyMail.id)
                  
                }
            },5000)
        },
        send() {
                this.$emit('addMail', this.subject,this.body ,this.recipient)
                // this.close()
                this.$emit('closeCompose')

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
        this.emptyMail= mailService.getEmptyMail()

    },
    data() {
        return {
            isOpen: false,
            recipient:'',
            subject:'',
            body:'',
            intervalId:'',
            emptyMail:null,

        }
    }
}
