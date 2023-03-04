import { bookService } from "../services/book.service.js"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
import BookHeader from "./BookHeader.js"

export default {
    template: `
        <BookHeader />
        <section class="book-edit" v-if="book">
            <form @submit.prevent="save">
                <h2>Edit book</h2>

                    <label for="txt">Title: 
                        <input type="text" id="txt" v-model="book.title" placeholder="Title">
                    </label>    
                    <label  for="price">Price: 
                        <input type="number" id="price" v-model.number="book.listPrice.amount">
                    </label>    
                    <button>Save <i class="fa-solid fa-floppy-disk"></i></button>
            </form>
        </section>
    `,
    data() {
        return {
            book: null
        }
    },
    methods: {
        save() {
            bookService.save(this.book)
                .then(savedBook => {
                    showSuccessMsg('Book edited')
                    this.$router.push('/book')
                })
                .catch(err => {
                    showErrorMsg('Book edit failed')
                })
        },
        loadBook() {
            bookService.get(this.bookId)
                .then(book => this.book = book)
        },
    },
    created() {
        this.loadBook()
    },
    computed: {
        bookId() {
            return this.$route.params.bookId
        },
    },
    components: {
        BookHeader,
    },
}