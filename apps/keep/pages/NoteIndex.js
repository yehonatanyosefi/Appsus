import NoteList from "../cmps/NoteList.js"
import NoteSideBar from "../cmps/NoteSideBar.js"
import NoteHeader from "../cmps/NoteHeader.js"
import { noteService } from "../services/note.service.js"
export default {
     props: [],
     template: `
     <main class="notes-index">
          <NoteHeader @set-route="setRoute"/>
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
          setRoute(route) {
               this.$emit('set-route', route)
          },
     },
     computed: {

     },
     created() {
     },
     components: {
          NoteList,
          NoteSideBar,
          NoteHeader,
     },
}