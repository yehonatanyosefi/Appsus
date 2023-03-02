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
               element.style.height = element.scrollHeight + 10 + 'px'
          },
     },
     computed: {

     },
     mounted() {
          this.resizeTA()
          window.addEventListener("resize", this.resizeTA)
     },
     unmounted() {
          window.removeEventListener('resize', this.resizeTA)
     },
     components: {

     },
     watch: {
     }
}