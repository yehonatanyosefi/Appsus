import LongTxt from '../cmps/LongTxt.js'
import ReviewList from '../cmps/ReviewList.js'
import AddReview from '../cmps/AddReview.js'
import { i18Service } from '../../../services/i18n.service.js'
import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import BookHeader from "../cmps/BookHeader.js"

export default {
    template: `
        <BookHeader/>
        <section v-if="book" class="book-details">
            <nav class="center">
                    <RouterLink :to="'/book/' + book.prevBookId"><i class="fa-solid fa-arrow-left"></i> Previous</RouterLink> |
                    <RouterLink :to="'/book/' + book.nextBookId">Next<i class="fa-solid fa-arrow-right"></i></RouterLink>
            </nav>
            <RouterLink :to="'/book/edit/'+book.id" class="center"><button>Edit Book</button></RouterLink>
            <hr />
            <div class="center">
                <div class="book-img">
                    <img v-if="book.listPrice.isOnSale" src="../assets/img/sale.png" class="on-sale"/>
                    <img :src="book.thumbnail">
                </div>
            </div>
            <h2 class="center">{{ book.title }}</h2>
            <h3 class="center">{{ book.subtitle }}</h3>
            <h4 :class="priceClass" class="center">Price: {{ formattedPrice }}</h4>
            <h4 v-if="pageText" class="center">{{ pageText }}</h4>
            <h4 v-if="publishedText" class="center">{{ publishedText }}</h4>
            <LongTxt :txt="book.description" :length="length"/>
            <AddReview :book="book" @add-review="addReview"/>
            <ReviewList :book="book" @remove-review="removeReview" />
            <RouterLink to="/book/" class="center">Close <i class="fa-solid fa-x"></i></RouterLink>
        </section>
    `,
    created() {
        this.loadBook()
    },
    data() {
        return {
            length: 100,
            book: null,
        }
    },
    methods: {
        addReview(newReview) {
            bookService.addReview(this.book.id, newReview)
                .then(updatedBook => {
                    this.book = updatedBook
                    showSuccessMsg('Review Added!')
                })
                .catch(err => {
                    showErrorMsg('Review failed')
                })
        },
        removeReview(reviewId) {
            bookService.removeReview(this.book.id, reviewId)
                .then(book => {
                    this.book = book
                    showSuccessMsg('Review removed')
                })
                .catch(err => {
                    showErrorMsg('Review remove failed')
                })
        },
        loadBook() {
            bookService.get(this.bookId)
                .then(book => this.book = book)
        },
    },
    computed: {
        pageText() {
            const { pageCount } = this.book
            if (pageCount > 500) return 'Serious Reading'
            if (pageCount > 200) return 'Decent Reading'
            if (pageCount < 100) return 'Light Reading'
            return ''
        },
        publishedText() {
            const { publishedDate: date } = this.book
            const currYear = new Date().getFullYear()
            if (currYear > date + 10) return 'Vintage'
            if (currYear <= date + 1) return 'New'
            return ''
        },
        priceClass() {
            const { currencyCode, amount } = this.book.listPrice
            const price = i18Service.currMultiplier(currencyCode, amount)
            return {
                'red': price > 150,
                'green': price < 20
            }
        },
        formattedPrice() {
            const { currencyCode, amount } = this.book.listPrice
            return i18Service.formatCurrency(currencyCode, amount)
        },
        bookId() {
            return this.$route.params.bookId
        },
    },
    components: {
        LongTxt,
        AddReview,
        ReviewList,
        BookHeader,
    },
    watch: {
        bookId() {
            this.loadBook()
        },
    },
}