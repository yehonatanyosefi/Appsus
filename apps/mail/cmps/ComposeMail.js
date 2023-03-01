import { mailService } from '../services/mail.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    props: [''],
    template: `
        <section class="compose-mail" :class="open">
            <header class="flex justify-between">
                <h3>New Message</h3>
                <div className="window-buttons">
                    <button class="minize"><i class="fa-regular fa-window-minimize"></i></button>
                    <button class="full-screen"><i class="fa-solid fa-up-right-and-down-left-from-center"></i></button>
                    <button class="close" @click="close"><i class="fa-solid fa-xmark"></i></button>
                </div>
            </header>

            <main class="mail-text">
                <input class="recipient" type="text" placeholder="Recipient"/>
                <input class="mail-subject" type="text" placeholder="Subject"/>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </main>

            <section class="send-mail flex justify-between">
                <button className="send">send</button>
                <button className="delete"><i class="fa-regular fa-trash-can"></i></button>
            </section>
        </section>
        `,
    computed: {
        open() {
            return { 'open': this.isOpen }
        },
    },
    methods: {
        close() {
            this.$emit('closeCompose')
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
        }
    }
}
