import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTES_KEY = 'notesDB'
_createDemo()

export const noteService = {
     query,
     get,
     remove,
     save,
     addNote,
     duplicateNote,
     deleteTodo,
     addTodo,
     toggleTodos,
     togglePin,
     toggleTodoCheck,
}

function query(filterBy = {}) {
     return storageService.query(NOTES_KEY)
          .then(notes => {
               // if (filterBy.txt) {
               //      const regex = new RegExp(filterBy.title, 'i')
               //      notes = notes.filter(note => regex.test(note.title))
               // }
               // if (filterBy.price) {
               //      notes = notes.filter(note => note.listPrice.amount >= filterBy.price)
               // }
               return notes
          })
}

function get(noteId) {
     return storageService.get(NOTES_KEY, noteId)
     // .then(_setNextPrevnoteId)
}

function remove(noteId) {
     return storageService.remove(NOTES_KEY, noteId)
}

function save(note) {
     if (note.id) {
          return storageService.put(NOTES_KEY, note)
     } else {
          return storageService.post(NOTES_KEY, note)
     }
}

function addNote() {
     const newNote = { id: null, createdAt: Date.now(), type: 'NoteTxt', isPinned: false, style: { backgroundColor: '#ffffff' }, info: { title: '', txt: '' } }
     return save(newNote)
}

function duplicateNote(noteId) {
     return get(noteId)
          .then(note => {
               note.id = ''
               return save(note)
                    .then(savedNote => query())
          })
}

function deleteTodo(noteId, idx) {
     return get(noteId)
          .then(note => {
               note.info.todos.splice(idx, 1)
               return save(note)
          })
}

function addTodo(noteId) {
     return get(noteId)
          .then(note => {
               note.info.todos.push({ txt: '', doneAt: null })
               return save(note)
          })
}

function toggleTodos(noteId) {
     return get(noteId)
          .then(note => {
               switch (note.type) {
                    case 'NoteTodos':
                         note.type = 'NoteTxt'
                         const todosMapped = note.info.todos.map((todo, idx) => {
                              if (idx !== note.info.todos.length - 1) return todo.txt + '\n'
                              return todo.txt
                         })
                         note.info.txt = todosMapped.join('')
                         break
                    case 'NoteTxt':
                         note.type = 'NoteTodos'
                         const todosSplitted = note.info.txt.split('\n')
                         note.info.todos = todosSplitted.map(todo => {
                              return { txt: todo, doneAt: null, }
                         })
                         break
               }
               return save(note)
          })
}
function togglePin(noteId) {
     return get(noteId)
          .then(note => {
               note.isPinned = !note.isPinned
               return save(note)
          })
}
function toggleTodoCheck(noteId, idx) {
     return get(noteId)
          .then(note => {
               const currTodo = note.info.todos
               if (currTodo[idx].doneAt) currTodo[idx].doneAt = null
               else currTodo[idx].doneAt = Date.now()
               return save(note)
          })
}

function _createDemo() {
     let notes = utilService.loadFromStorage(NOTES_KEY)
     if (!notes || !notes.length) {
          notes = [
               { id: 'n101', createdAt: 1112325, type: 'NoteTxt', isPinned: true, style: { backgroundColor: '#ffff6b' }, info: { title: 'Notes from Yaron', txt: 'Throw away my code' } },
               {
                    id: 'n102', createdAt: 1112222, type: 'NoteTxt', isPinned: false, style: { backgroundColor: '#ccffd9' }, info: {
                         title: `Poem`, txt: `Eran leads with patience and care,
His students' progress, his utmost prayer,
Through lines of code and tech despair,
He guides them to the finish line, fair and square.` }
               },
               {
                    id: 'n103', createdAt: 1112567, type: 'NoteTodos', isPinned: false, style: { backgroundColor: '#fffff1' }, info: {
                         title: 'TODO: Laugh', todos: [{ txt: 'Call Islam', doneAt: null },
                         { txt: 'Say Aloo', doneAt: 187111111 }]
                    }
               },
               { id: 'n104', createdAt: 1112434, type: 'NoteImg', isPinned: true, style: { backgroundColor: '#bdffff' }, info: { title: 'My Favorite Book', url: `https://m.media-amazon.com/images/I/81iqZ2HHD-L._AC_UF1000,1000_QL80_.jpg` } },
               { id: 'n105', createdAt: 1112552, type: 'NoteTodos', isPinned: false, style: { backgroundColor: '#fff5f5' }, info: { title: 'To do', todos: [{ txt: 'Finish CSS', doneAt: null }, { txt: 'Get CR', doneAt: 187111111 }] } },

          ]
          utilService.saveToStorage(NOTES_KEY, notes)
     }
     return notes
}