export default {
     props: [],
     template: `
     <div class="flex justify-center align-center note-add">
          <div class="flex justify-center align-center note-add-container">
               <textarea placeholder="Take a note..." v-model="currText"></textarea>
               <button @click="addNote">
                    <i class="fa-solid fa-circle-plus add-note"></i>
               </button>
          </div>
     </div>
`,
     data() {
          return {
               currText: '',
          }
     },
     methods: {
          addNote() {
               this.$emit('addNote', this.currText)
               this.currText = ''
          }
     },
     computed: {

     },
     created() {

     },
     components: {

     },
}