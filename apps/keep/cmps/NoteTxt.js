export default {
     props: ['note'],
     template: `
     <textarea v-model="txt" @input="updateTxt">
     </textarea>
`,
     data() {
          return {
               txt: null,
          }
     },
     methods: {
          updateTxt() {
               this.note.info.txt = this.txt
               this.$emit('updateTxt', this.note)
          },
     },
     computed: {

     },
     created() {
          this.txt = this.note.info.txt
     },
     components: {

     },
     watch: {
     }
}