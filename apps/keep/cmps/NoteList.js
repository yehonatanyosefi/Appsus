import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import NotePreview from "./NotePreview.js"
import NoteAdd from "./NoteAdd.js"
import NoteDetails from "./NoteDetails.js"
export default {
     props: [],
     template: `
          <NoteAdd @addNote="addNote" />
          <div class="notes-container">
               <div class="main-notes">
                    <template v-for="note,idx in notes" :key="idx">
                         <NotePreview v-if="note.isPinned" :note="note"
                              @updateNote="updateNote"
                              @deleteNote="deleteNote"
                              @duplicateNote="duplicateNote"
                              @deleteTodo="deleteTodo"
                              @addTodo="addTodo"
                              @toggleTodos="toggleTodos"
                              @togglePin="togglePin"
                              @toggleTodoCheck="toggleTodoCheck"
                              @openNote="openNote" />
                    </template>
               </div>
               <div class="main-notes">
                    <template v-for="note,idx in notes" :key="idx">
                         <NotePreview v-if="!note.isPinned" :note="note"
                              @updateNote="updateNote"
                              @deleteNote="deleteNote"
                              @duplicateNote="duplicateNote"
                              @deleteTodo="deleteTodo"
                              @addTodo="addTodo"
                              @toggleTodos="toggleTodos"
                              @togglePin="togglePin"
                              @toggleTodoCheck="toggleTodoCheck"
                              @openNote="openNote" />
                    </template>
               </div>
          </div>
          <NoteDetails v-if="showDetails" :note="showNote"
                    @updateNote="updateNote"
                    @deleteNote="deleteNote"
                    @duplicateNote="duplicateNote"
                    @deleteTodo="deleteTodo"
                    @addTodo="addTodo"
                    @toggleTodos="toggleTodos"
                    @togglePin="togglePin"
                    @toggleTodoCheck="toggleTodoCheck" />
          <div class="note-screen" @click="toggleScreen" v-if="showDetails"></div>
     `,
     data() {
          return {
               notes: null,
               showDetails: false,
               showId: null,
          }
     },
     methods: {
          addTodo(noteId) {
               noteService.addTodo(noteId)
                    .then(newNote => {
                         const noteIdx = this.notes.findIndex(note => note.id === noteId)
                         this.notes[noteIdx] = newNote
                    })
          },
          updateNote(updatedNote) {
               // console.log(`updatedNote:`, updatedNote)
               // const currNote = this.notes.find(note => note.id === updatedNote.id)
               // console.log(`currNote:`, currNote)
               // if (currNote === updatedNote) return
               noteService.save(updatedNote) //TODO: refactor with event bus
               // .then(res => console.log(`res:`, res))
          },
          deleteNote(noteId) {
               this.showDetails = false
               noteService.remove(noteId)
                    .then(res => {
                         const idx = this.notes.findIndex(note => note.id === noteId)
                         this.notes.splice(idx, 1)
                         showSuccessMsg('Note deleted')
                    })
                    .catch(err => showErrorMsg('Note delete failed'))
          },
          duplicateNote(noteId) {
               noteService.duplicateNote(noteId)
                    .then(newNotes => this.notes = newNotes)
          },
          addNote(txt) {
               noteService.addNote(txt)
                    .then(newNote => {
                         this.notes.push(newNote)
                         showSuccessMsg('Note added')
                    })
                    .catch(err => showErrorMsg('Note add failed'))
          },
          deleteTodo(noteId, idx) {
               noteService.deleteTodo(noteId, idx)
                    .then(newNote => {
                         const noteIdx = this.notes.findIndex(note => note.id === noteId)
                         this.notes[noteIdx] = newNote
                    })
          },
          toggleTodos(noteId) {
               noteService.toggleTodos(noteId)
                    .then(newNote => {
                         const noteIdx = this.notes.findIndex(note => note.id === noteId)
                         this.notes[noteIdx] = newNote
                    })
          },
          togglePin(noteId) {
               noteService.togglePin(noteId)
                    .then(newNote => {
                         const noteIdx = this.notes.findIndex(note => note.id === noteId)
                         this.notes[noteIdx] = newNote
                         let msg = 'Note '
                         if (!newNote.isPinned) msg = msg + 'unpinned'
                         else msg = msg + 'pinned'
                         showSuccessMsg(msg)
                    })
                    .catch(err => showErrorMsg('Note pin failed'))
          },
          toggleTodoCheck(noteId, idx) {
               noteService.toggleTodoCheck(noteId, idx)
                    .then(newNote => {
                         const noteIdx = this.notes.findIndex(note => note.id === noteId)
                         this.notes[noteIdx] = newNote
                    })
          },
          toggleScreen() {
               this.showDetails = !this.showDetails
          },
          openNote(noteId) {
               this.showDetails = true
               this.showId = noteId
          },
     },
     computed: {
          showNote() {
               return this.notes.filter(note => note.id === this.showId)[0]
          },
     },
     created() {
          noteService.query()
               .then(notes => this.notes = notes)
     },
     components: {
          NotePreview,
          NoteAdd,
          NoteDetails,
     },
}