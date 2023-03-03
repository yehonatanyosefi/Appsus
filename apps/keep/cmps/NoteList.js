import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { eventBus } from '../../../services/event-bus.service.js'
import NotePreview from "./NotePreview.js"
import NoteAdd from "./NoteAdd.js"
import NoteDetails from "./NoteDetails.js"
export default {
     props: [],
     template: `
          <NoteAdd @addNote="addNote" />
          <div class="notes-list">
               <template v-if="!filterBy.deleted">
                    <template v-if="arePinned">
                         <div class="notes-container-title" v-if="areUnpinned">PINNED</div>
                         <div class="main-notes">
                              <template v-for="note,idx in notes" :key="idx">
                                   <NotePreview v-if="note.isPinned && !note.isDeleted && isUnfiltered(note)" :note="note"
                                        @updateNote="updateNote"
                                        @deleteNote="deleteNote"
                                        @duplicateNote="duplicateNote"
                                        @deleteTodo="deleteTodo"
                                        @addTodo="addTodo"
                                        @toggleTodos="toggleTodos"
                                        @togglePin="togglePin"
                                        @toggleTodoCheck="toggleTodoCheck"
                                        @openNote="openNote"
                                        @exchangeNotes="exchangeNotes" />
                              </template>
                         </div>
                    </template>
                    <template v-if="areUnpinned">
                         <div class="notes-container-title" v-if="arePinned">OTHERS</div>
                         <div class="main-notes">
                              <template v-for="note,idx in notes" :key="idx">
                                   <NotePreview v-if="!note.isPinned && !note.isDeleted && isUnfiltered(note)" :note="note"
                                        @updateNote="updateNote"
                                        @deleteNote="deleteNote"
                                        @duplicateNote="duplicateNote"
                                        @deleteTodo="deleteTodo"
                                        @addTodo="addTodo"
                                        @toggleTodos="toggleTodos"
                                        @togglePin="togglePin"
                                        @toggleTodoCheck="toggleTodoCheck"
                                        @openNote="openNote"
                                        @exchangeNotes="exchangeNotes" />
                              </template>
                         </div>
                    </template>
                    <div v-else-if="!arePinned" class="notes-container-title">NO NOTES</div>
               </template>
               <template v-else>
                    <div v-if="areDeleted" class="notes-container-title">TRASH</div>
                    <div v-else class="notes-container-title">NO TRASH</div>
                    <div class="main-notes">
                    <template v-for="note,idx in notes" :key="idx">
                         <NotePreview v-if="note.isDeleted && isUnfiltered(note)" :note="note"
                              @updateNote="updateNote"
                              @deleteNote="deleteNote"
                              @duplicateNote="duplicateNote"
                              @deleteTodo="deleteTodo"
                              @addTodo="addTodo"
                              @toggleTodos="toggleTodos"
                              @togglePin="togglePin"
                              @toggleTodoCheck="toggleTodoCheck"
                              @openNote="openNote"
                              @restoreNote="restoreNote"
                              @exchangeNotes="exchangeNotes" />
                         </template>
                    </div>
               </template>
          </div>
          <NoteDetails v-if="showDetails" :note="showNote"
                    @updateNote="updateNote"
                    @deleteNote="deleteNote"
                    @duplicateNote="duplicateNote"
                    @deleteTodo="deleteTodo"
                    @addTodo="addTodo"
                    @toggleTodos="toggleTodos"
                    @togglePin="togglePin"
                    @toggleTodoCheck="toggleTodoCheck"
                    @restoreNote="restoreNote" />
          <div class="note-screen" @click="toggleScreen" v-if="showDetails"></div>
     `,
     data() {
          return {
               notes: null,
               showDetails: false,
               showId: null,
               filterBy: { deleted: false, search: '', },
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
               noteService.save(updatedNote)
               // .then(newNote => {
               //      const noteIdx = this.notes.findIndex(note => note.id === noteId)
               //      this.notes[noteIdx] = newNote
               // })
          },
          deleteNote(noteId) {
               if (this.notes.find(note => note.id === noteId).isDeleted === true) {
                    this.removeNote(noteId)
                    return
               }
               this.showDetails = false
               noteService.deleteNote(noteId)
                    .then(res => {
                         const idx = this.notes.findIndex(note => note.id === noteId)
                         this.notes[idx].isDeleted = true
                         this.notes[idx].isPinned = false
                         showSuccessMsg('Moved to trash')
                    })
                    .catch(err => showErrorMsg('Move to trash failed'))
          },
          removeNote(noteId) {
               this.showDetails = false
               noteService.remove(noteId)
                    .then(res => {
                         const idx = this.notes.findIndex(note => note.id === noteId)
                         this.notes.splice(idx, 1)
                         showSuccessMsg('Note deleted')
                    })
                    .catch(err => showErrorMsg('Note delete failed'))
          },
          restoreNote(noteId) {
               this.showDetails = false
               noteService.restoreNote(noteId)
                    .then(res => {
                         const idx = this.notes.findIndex(note => note.id === noteId)
                         this.notes[idx].isDeleted = false
                         showSuccessMsg('Note Restored')
                    })
                    .catch(err => showErrorMsg('Note Restore failed'))

          },
          duplicateNote(noteId) {
               noteService.duplicateNote(noteId)
                    .then(newNotes => this.notes = newNotes)
          },
          addNote(note) {
               noteService.addNote(note)
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
          setFilterBy(filterBy) {
               const { val, setVal } = filterBy
               this.filterBy[val] = setVal
          },
          isUnfiltered(note) {
               if (!note) return true
               const currNote = note.info
               const regexByName = new RegExp(this.filterBy.search, 'i')
               if (regexByName.test(currNote.title)) return true
               if (note.type === 'NoteTxt') return regexByName.test(currNote.txt)
               if (note.type === 'NoteTodos') return currNote.todos.some(todo => regexByName.test(todo.txt))
               return false
          },
          exchangeNotes(exchangeInfo) {
               noteService.exchangeNotes(exchangeInfo)
                    .then((exchangeNoteInfo) => {
                         const { senderIdx, updatedSender, receiverIdx, updatedReceiver } = exchangeNoteInfo
                         this.notes[senderIdx] = updatedReceiver
                         this.notes[receiverIdx] = updatedSender
                    })
                    .catch(err => showErrorMsg(`Both notes need the same pin status`))
          },
     },
     computed: {
          showNote() {
               return this.notes.filter(note => note.id === this.showId)[0]
          },
          arePinned() {
               if (!this.notes) return false
               return this.notes.some(note => note.isPinned && !note.isDeleted)
          },
          areUnpinned() {
               if (!this.notes) return false
               return this.notes.some(note => !note.isPinned && !note.isDeleted)
          },
          areDeleted() {
               if (!this.notes) return false
               return this.notes.some(note => note.isDeleted)
          },
     },
     created() {
          noteService.query()
               .then(notes => this.notes = notes)
          eventBus.on('setFilterBy', this.setFilterBy)
     },
     components: {
          NotePreview,
          NoteAdd,
          NoteDetails,
     },
}