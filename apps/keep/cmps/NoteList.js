import { noteService } from "../services/note.service.js"
import NotePreview from "./NotePreview.js"
export default {
     props: [],
     template: `
          <button @click="addNote">+</button>
          <div class="main-notes">
          <template v-for="note,idx in notes" :key="idx" class="main-notes">
               <NotePreview :note="note" @updateNote="updateNote" @deleteNote="deleteNote" @duplicateNote="duplicateNote" />
          </template>
     </div>
     `,
     data() {
          return {
               notes: null,
          }
     },
     methods: {
          updateNote(updatedNote) {
               // console.log(`updatedNote:`, updatedNote)
               // const currNote = this.notes.find(note => note.id === updatedNote.id)
               // console.log(`currNote:`, currNote)
               // if (currNote === updatedNote) return
               noteService.save(updatedNote) //TODO: refactor with event bus
               // .then(res => console.log(`res:`, res))
          },
          deleteNote(noteId) {
               noteService.remove(noteId)
                    .then(res => {
                         const idx = this.notes.findIndex(note => note.id === noteId)
                         this.notes.splice(idx, 1)
                    })
          },
          duplicateNote(noteId) {
               noteService.duplicateNote(noteId)
                    .then(newNotes => this.notes = newNotes)
          },
          addNote() {
               noteService.addNote()
                    .then(newNote => this.notes.push(newNote))
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