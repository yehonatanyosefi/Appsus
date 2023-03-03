import NoteList from "../cmps/NoteList.js"
import NoteSideBar from "../cmps/NoteSideBar.js"
import { noteService } from "../services/note.service.js"
export default {
     props: [],
     template: `
     <main class="notes-index">
          <section class="notes-sidebar-container">
               <NoteSideBar />
          </section>
          <section class="notes-container">
               <NoteList />
          </section>
     </main>
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
          NoteSideBar,
     },
}