import { noteService } from "../services/note.service.js"
import NotePreview from "./NotePreview.js"
export default {
     props: [],
     template: `
          <div v-for="note,idx in notes" :key="idx" class="main-notes">
               <NotePreview :note="note"/>
          </div>
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