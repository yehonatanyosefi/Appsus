import { noteService } from "../services/note.service.js"
import NotePreview from "./NotePreview.js"
export default {
     props: [],
     template: `
          <div v-for="note,idx in notes" :key="idx" class="main-notes">
               <NotePreview :note="note" @updateTxt="updateTxt"/>
          </div>
     `,
     data() {
          return {
               notes: null,
          }
     },
     methods: {
          updateTxt(updatedNote) { //TODO: ask if i want to send copy instead
               // console.log(`updatedNote:`, updatedNote)
               // const currNote = this.notes.find(note => note.id === updatedNote.id)
               // console.log(`currNote:`, currNote)
               // if (currNote === updatedNote) return
               noteService.save(updatedNote) //TODO: refactor with event bus
                    .then(res => console.log(`res:`, res))
          },
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