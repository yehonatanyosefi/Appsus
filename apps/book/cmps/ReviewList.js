export default {
    props: ['book'],
    template: `
        <ul v-if="book.reviews && book.reviews.length">
            <li class="clean-list center underline">Reviews:</li>
            <br>
            <li v-for="review in book.reviews" :key="review.id" class="clean-list center">
                Review:  {{review.name}}
                <span v-for="rate in parseInt(review.rate)">
                    <i class="fa-solid fa-star"></i>
                </span>
                {{review.date}} <button @click="$emit('removeReview', review.id)">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </li>
        </ul>
    `,

}