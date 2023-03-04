import BookPreview from './BookPreview.js'

export default {
    props: ['books'],
    template: `
        <section class="book-list">
            <ul>
                <li v-for="book in books" :key="book.id" class="book-card">
                    <RouterLink :to="{name:'details', params:{bookId:book.id}, query:{user:'Unknown'}}" class="book">
                        <bookPreview :book="book"/>
                    </RouterLink>
                    <button @click="remove(book.id)" class="delete-btn">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </li>
            </ul>
        </section>
    `,
    methods: {
        remove(bookId) {
            this.$emit('remove', bookId)
        },
    },
    components: {
        BookPreview,
    }
}