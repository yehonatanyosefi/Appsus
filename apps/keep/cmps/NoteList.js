import { noteService } from "../services/note.service.js"
import NotePreview from "./NotePreview.js"
export default {
     props: [],
     template: `
          <template v-for="note,idx in notes" :key="idx">
               <NotePreview :note="note"/>
          </template>
     `,
     data() {
          return {
               notes: null,
          }
     },
     methods: {

     },
     computed: {

     },
     created() {
          noteService.query()
               .then(notes => this.notes = notes)
     },
     components: {
          NotePreview,
     },
}