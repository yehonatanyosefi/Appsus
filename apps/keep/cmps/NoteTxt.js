export default {
     props: ['note'],
     template: `
     <textarea v-model="text">
     </textarea>
`,
     data() {
          return {
               text: null,
          }
     },
     methods: {

     },
     computed: {

     },
     created() {
          this.text = this.note.info.txt
     },
     components: {

     },
     watch: {
          text() {
               // this.$emit('updateText', this.text)
          }
     }
}