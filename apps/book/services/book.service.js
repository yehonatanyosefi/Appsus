'use strict'

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import booksJSON from './json/books.json' assert {type: 'json'}

const BOOK_KEY = 'bookDB'

_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    addReview,
    removeReview,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
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

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(_setNextPrevBookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(id = '', priceAmount = 150) {
    return {
        id,
        title: '',
        subtitle: 'mi est eros convallis auctor arcu dapibus himenaeos',
        authors: [
            'Barbara booktland'
        ],
        publishedDate: 1999,
        description: 'placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse',
        pageCount: 713,
        categories: [
            'Computers',
            'Hack',
        ],
        thumbnail: "http://coding-academy.org/books-photos/20.jpg",
        language: 'en',
        listPrice: {
            amount: priceAmount,
            currencyCode: 'USD',
            isOnSale: false,
        },
        reviews: [],
    }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = booksJSON
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function addReview(bookId, review) {
    return get(bookId)
        .then(book => {
            book.reviews.push(review)
            return save(book)
        })
}

function removeReview(bookId, reviewId) {
    return get(bookId)
        .then(book => {
            const reviewIdx = book.reviews.findIndex(review => review.id === reviewId)
            book.reviews.splice(reviewIdx, 1)
            return save(book)
        })

}

function _setNextPrevBookId(book) {
    return storageService.query(BOOK_KEY)
        .then((books) => {
            const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
            book.nextBookId = books[bookIdx + 1] ? books[bookIdx + 1].id : books[0].id
            book.prevBookId = books[bookIdx - 1] ? books[bookIdx - 1].id : books[books.length - 1].id
            return book
        })
}