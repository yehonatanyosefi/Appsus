import { utilService } from '../../../services/util.service.js'

const NOTES_KEY = 'notesDB'
const gNotes = _createDemo()

export const noteService = {
     query,
     get,
     remove,
     save,
     gNotes,
}

function query(filterBy = {}) {
     return storageService.query(NOTES_KEY)
          .then(books => {
               if (filterBy.txt) {
                    const regex = new RegExp(filterBy.title, 'i')
                    books = books.filter(book => regex.test(book.title))
               }
               if (filterBy.price) {
                    books = books.filter(book => book.listPrice.amount >= filterBy.price)
               }
               return books
          })
}

function get(noteId) {
     return storageService.get(NOTES_KEY, noteId)
     // .then(_setNextPrevnoteId)
}

function remove(noteId) {
     return storageService.remove(NOTES_KEY, noteId)
}

function save(book) {
     if (book.id) {
          return storageService.put(NOTES_KEY, book)
     } else {
          return storageService.post(NOTES_KEY, book)
     }
}

function _createDemo() {
     let notes = utilService.loadFromStorage(NOTES_KEY)
     if (!notes || !notes.length) {
          notes = 'hi'
          utilService.saveToStorage(NOTES_KEY, notes)
     }
     return notes
}