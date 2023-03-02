import { utilService } from "../../../services/util.service.js"
export default {
     props: ['note', 'isPreview'],
     template: `
     <p v-if="isPreview" class="preview-text">{{note.info.txt}}</p>
     <textarea
          v-else
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
          if (!this.isPreview) {
               window.addEventListener("resize", this.debouncedResizeTA)
               setTimeout(() => this.resizeTA(), 0)
          }
     },
     unmounted() {
          if (!this.isPreview) window.removeEventListener('resize', this.debouncedResizeTA)
     },
     components: {

     },
     watch: {
     }
}