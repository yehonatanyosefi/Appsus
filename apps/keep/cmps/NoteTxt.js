import { utilService } from "../../../services/util.service.js"
export default {
     props: ['note', 'isPreview', 'isFocus'],
     template: `
     <p v-if="isPreview && note.info.txt" v-html="previewTxt" class="preview-txt"></p>
     <p v-else-if="isPreview && !note.info.txt" class="preview-txt">text</p>
     <textarea
          v-else-if="!isPreview"
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
               const element = this.$refs.textArea
               element.style.height = '20px'
               element.style.height = element.scrollHeight + 6 + 'px'
          },
     },
     computed: {
          debouncedResizeTA() {
               return utilService.debounce(this.resizeTA, 250)
          },
          previewTxt() {
               return this.note.info.txt.replaceAll('\n', '<br>')
          },
     },
     mounted() {
          if (!this.isPreview) {
               window.addEventListener("resize", this.debouncedResizeTA)
               setTimeout(() => this.resizeTA(), 0)
          }
          if (this.isFocus) this.$refs.textArea.focus()
     },
     unmounted() {
          if (!this.isPreview) window.removeEventListener('resize', this.debouncedResizeTA)
     },
     components: {

     },
     watch: {
     }
}