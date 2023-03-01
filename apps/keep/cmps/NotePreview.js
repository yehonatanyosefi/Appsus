import NoteTodos from "./NoteTodos.js"
import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"

export default {
     props: ['note'],
     template: `
     <div class="note-card">
          <component :is="note.type" :note="note" />
     </div>
     `,
     data() {
          return {

          }
     },
     methods: {

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