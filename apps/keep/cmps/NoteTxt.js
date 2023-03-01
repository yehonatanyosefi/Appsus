export default {
     props: ['note'],
     template: `
     <textarea v-model="note.info.txt" @input="updateNote"  :style="textAreaSize" ref="textArea">
     </textarea>
`,
     data() {
          return {
          }
     },
     methods: {
          updateNote() {
               this.$emit('updateNote', this.note)
          },
     },
     computed: {
          textAreaSize() {
               // if (!this.$refs.textArea) return ''
               // this.$refs.textArea.style.height = 500 + 'px'
               // this.$refs.textarea.scrollHeight - 4 + 'px'
          },

     },
     created() {
     },
     components: {

     },
     watch: {
     }
}