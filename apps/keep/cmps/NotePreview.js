import NoteTodos from "./NoteTodos.js"
import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"

export default {
     props: ['note'],
     template: `
     <div class="note-card">
          <component :is="note.type" :note="note" @updateTxt="updateTxt" />
     </div>
     `,
     data() {
          return {

          }
     },
     methods: {
          updateTxt(updatedNote) {
               this.$emit('updateTxt', updatedNote)
          },
     },
     computed: {

     },
     created() {

     },
     components: {
          NoteTodos,
          NoteTxt,
          NoteImg,
     },
}