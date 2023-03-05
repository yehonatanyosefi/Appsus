import { bookService } from "./book.service.js"
import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"


const SEARCH_KEY = 'searchDB'

_setSearch()

export const googleBookService = {
     addBook,
     get,
}

function addBook(bookTitle, books) {
     const book = books.find(book => book.volumeInfo.title === bookTitle)
     const info = book.volumeInfo
     const newBook = {
          id: '',
          title: info.title || 'No title available.',
          subtitle: info.subtitle || '',
          authors: info.authors || [],
          publishedDate: info.publishedDate || 2000,
          description: info.description || 'No text available.',
          pageCount: info.pageCount || 0,
          categories: info.categories || [],
          thumbnail: info.imageLinks.thumbnail || '././assets/img/default.png',
          language: info.language || 'en',
          listPrice: {
               amount: utilService.getRandomIntInclusive(50, 190),
               currencyCode: 'USD',
               isOnSale: (Math.random() < 0.5) ? false : true,
          },
          reviews: [],
     }
     return bookService.save(newBook)
}

function get(keyword) {
     return storageService.query(SEARCH_KEY)
          .then(books => {
               if (!books[keyword]) return _getBooks(keyword)
               return books[keyword]
          })
          .catch(err => {
               return _getBooks(keyword)
          })
}

function _getBooks(keyword) {
     return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${keyword}`)
          .then(books => _save(books, keyword))
}

function _save(newBooks, keyword) {
     return storageService.query(SEARCH_KEY)
          .then(books => {
               books[keyword] = newBooks
               utilService.saveToStorage(SEARCH_KEY, books)
               return books[keyword]
          })
}

function _setSearch() {
     storageService.query(SEARCH_KEY)
          .then(books => {
               if (!books) books = {}
               utilService.saveToStorage(SEARCH_KEY, books)
          })
}
