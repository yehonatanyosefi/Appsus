import NoteList from "../cmps/NoteList.js"
import { noteService } from "../services/note.service.js"
export default {
     props: [],
     template: `
          <div class="notes-container">

               <NoteList />
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
          NoteList,
     },
}