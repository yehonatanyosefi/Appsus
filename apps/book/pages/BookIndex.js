import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"

import BookFilter from '../cmps/BookFilter.js'
import BookList from '../cmps/BookList.js'
import BookHeader from '../cmps/BookHeader.js'


export default {
    template: `
        <section class="book-index">
            <BookHeader :isList="true" @filter="setFilterBy"/>
            <BookList 
            v-if="books"
            :books="filteredBooks" 
            @remove="removeBook"  />
        </section>
    `,
    data() {
        return {
            books: null,
            filterBy: {},
        }
    },
    methods: {
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(() => {
                    const idx = this.books.findIndex(book => book.id === bookId)
                    this.books.splice(idx, 1)
                    showSuccessMsg('Book removed')
                })
                .catch(err => {
                    showErrorMsg('Book remove failed')
                })
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        },
    },
    computed: {
        filteredBooks() {
            if (!this.filterBy.price) {
                this.filterBy.title = ''
                this.filterBy.price = 200
            }
            const regex = new RegExp(this.filterBy.title, 'i')
            return this.books.filter(book => regex.test(book.title) && book.listPrice.amount <= this.filterBy.price)
        },
    },
    created() {
        bookService.query()
            .then(books => this.books = books)
    },
    components: {
        BookList,
        BookFilter,
        BookHeader,
    }
}