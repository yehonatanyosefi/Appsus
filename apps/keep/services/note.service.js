import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTES_KEY = 'notesDB'
_createDemo()

export const noteService = {
     query,
     get,
     remove,
     save,
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

function _createDemo() {
     let notes = utilService.loadFromStorage(NOTES_KEY)
     if (!notes || !notes.length) {
          notes = [
               { id: 'n101', createdAt: 1112222, type: 'NoteTxt', isPinned: true, style: { backgroundColor: '#00d' }, info: { txt: 'Fullstack Me Baby!' } },
               { id: 'n102', type: 'NoteImg', isPinned: false, info: { url: 'https://m.media-amazon.com/images/M/MV5BNmQ0ODBhMjUtNDRhOC00MGQzLTk5MTAtZDliODg5NmU5MjZhXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_FMjpg_UX1000_.jpg', title: 'Bobi and Me' }, style: { backgroundColor: '#00d' } },
               { id: 'n103', type: 'NoteTodos', isPinned: false, info: { title: 'Get my stuff together', todos: [{ txt: 'Driving license', doneAt: null }, { txt: 'Coding power', doneAt: 187111111 }] } }
          ]
          utilService.saveToStorage(NOTES_KEY, notes)
     }
     return notes
}