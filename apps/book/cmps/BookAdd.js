import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { googleBookService } from '../services/googleBook.service.js'
import { utilService } from '../../../services/util.service.js'
import BookHeader from './BookHeader.js'

export default {
    template: `
        <BookHeader />
        <section class="book-add">
            <form @submit.prevent="">
                <h2>Add a book</h2>
                <input type="search" v-model="searchStr" placeholder="Search">
                <ul v-if="searchedBooksTitle !== null">
                    <li v-for="bookTitle,idx in searchedBooksTitle" key="idx" >
                        {{bookTitle}} <button @click="addBook(bookTitle)"><i class="fa-solid fa-circle-plus"></i></button>
                    </li>
                </ul>
                <h4 v-else>No Books Found</h4>
                <RouterLink to="/book/" class="center">Close <i class="fa-solid fa-x"></i></RouterLink>
            </form>
        </section>
    `,
    data() {
        return {
            searchStr: '',
            searchedBooksTitle: null,
            searchedBooks: null,
        }
    },
    watch: {
        searchStr() {
            this.debouncedDoSearch()
        },
    },
    computed: {
        debouncedDoSearch() {
            return utilService.debounce(this.doSearch, 500)
        },
    },
    methods: {
        addBook(bookTitle) {
            googleBookService.addBook(bookTitle, this.searchedBooks)
                .then(savedBook => {
                    showSuccessMsg('Book added')
                })
                .catch(err => {
                    showErrorMsg('Book add failed')
                })
        },
        doSearch() {
            if (!this.searchStr) return
            googleBookService.get(this.searchStr)
                .then(res => {
                    this.searchedBooks = res.data.items
                    this.searchedBooksTitle = (!this.searchedBooks || !this.searchedBooks.length) ? null : this.searchedBooks.map(book => book.volumeInfo.title)
                })
        },
    },
    created() {
    },
    components: {
        BookHeader,
    },
}