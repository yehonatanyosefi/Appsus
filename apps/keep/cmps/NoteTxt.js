import { utilService } from "../../../services/util.service.js"
export default {
     props: ['note'],
     template: `
     <textarea
          v-model="note.info.txt"
          @input="updateNote"
          ref="textArea"
          placeholder="text">
     </textarea>
`,
     data() {
          return {
          }
     },
     methods: {
          updateNote() {
               this.resizeTA()
               this.$emit('updateNote', this.note)
          },
          resizeTA() {
               let element = this.$refs.textArea
               element.style.height = '20px'
               element.style.height = element.scrollHeight + 12 + 'px'
          },
     },
     computed: {
          debouncedResizeTA() {
               return utilService.debounce(this.resizeTA, 250)
          },
     },
     mounted() {
          window.addEventListener("resize", this.debouncedResizeTA)
          setTimeout(() => this.resizeTA(), 0)
     },
     unmounted() {
          window.removeEventListener('resize', this.debouncedResizeTA)
     },
     components: {

     },
     watch: {
     }
}