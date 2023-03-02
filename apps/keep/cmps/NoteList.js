import { noteService } from "../services/note.service.js"
import NotePreview from "./NotePreview.js"
export default {
     props: [],
     template: `
          <div class="flex justify-center align-center add-note">
               <button @click="addNote">
                    <i class="fa-solid fa-circle-plus add-note"></i>
               </button>
          </div>
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
                              @toggleTodoCheck="toggleTodoCheck" />
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
                              @toggleTodoCheck="toggleTodoCheck" />
                    </template>
               </div>
          </div>
     `,
     data() {
          return {
               notes: null,
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
                    })
          },
          toggleTodoCheck(noteId, idx) {
               noteService.toggleTodoCheck(noteId, idx)
                    .then(newNote => {
                         const noteIdx = this.notes.findIndex(note => note.id === noteId)
                         this.notes[noteIdx] = newNote
                    })
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