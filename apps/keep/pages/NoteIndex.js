import NoteList from "../cmps/NoteList.js"
import { noteService } from "../services/note.service.js"
export default {
     props: [],
     template: `
          <NoteList />
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