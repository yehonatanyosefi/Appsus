export default {
     props: ['note'],
     template: `
     <textarea v-model="note.info.txt" @input="updateNote">
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

     },
     created() {
     },
     components: {

     },
     watch: {
     }
}