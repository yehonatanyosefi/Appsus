import { i18Service } from '../../../services/i18n.service.js'

export default {
    props: ['book'],
    template: `
        <article class="book-preview">
            <div class="book-img">
                <img v-if="book.listPrice.isOnSale" src="../assets/img/sale.png" class="on-sale"/>
                <img :src="book.thumbnail">
            </div>
            <h4 class="center">{{ book.title }}</h4>
            <h5 class="price center">{{ formattedPrice }}</h5>
        </article>
    `,
    computed: {
        formattedPrice() {
            const { currencyCode, amount } = this.book.listPrice
            return i18Service.formatCurrency(currencyCode, amount)
        },
    }
}