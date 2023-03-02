import { eventBus } from '../services/event-bus.service.js'

export default {
	template: `
        <section :class="msg.type" v-if="msg.txt" class="user-msg flex justify-center align-center">
            {{ msg.txt }}
		  <button @click="msg.txt = ''">
			<i class="fa-solid fa-xmark close-msg"></i>
		</button>
        </section>
    `,
	data() {
		return {
			msg: { txt: '', type: 'success', timeout: null, },
			gTimeout: null,
		}
	},
	created() {
		eventBus.on('show-msg', this.showMsg)
	},
	methods: {
		showMsg(msg) {
			this.msg = msg
			clearTimeout(this.gTimeout)
			this.gTimeout = setTimeout(() => (this.msg.txt = ''), this.msg.timeout || 1500)
		},
	},
}
