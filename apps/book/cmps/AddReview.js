import { utilService } from '../../../services/util.service.js'

export default {
    props: ['book'],
    template: `
        <section v-if="book" class="book-details center">
            <h4 class="underline">Add a review: </h4>
            <form @submit.prevent="addReview">
                <label for="review-name">Name: </label>
                <input type="text" id="review-name" v-model="reviewName" placeHolder="Name" />
                <div class="star-reviews">
                    Stars: 
                    <template v-for="star in stars" :key="star">
                        <input
                        type="radio"
                        :id="'rating'+star"
                        :value="star"
                        hidden
                        v-model="checkedStars" />
                        <label :for="'rating'+star">
                            <i class="star fa-star"
                            :class="{ 'fa-solid': isHover(star) , 'fa-regular': true }"
                            @mouseover="currHover(star)"
                            @mouseleave="currHover(checkedStars)"></i>
                        </label>
                    </template>
                </div>
                <div>Date Read: <input type="date" v-model="date"/></div>
                <br>
                <div class="center">
                    <button type="submit">Submit<i class="fa-solid fa-paper-plane"></i></button>
                </div>
            </form>
        </section>
    `,
    created() {
        this.resetDate()
    },
    data() {
        return {
            date: '',
            reviewName: '',
            checkedStars: 3,
            hoverStar: 3,
            stars: [1, 2, 3, 4, 5],
        }
    },
    methods: {
        addReview() {
            const review = { name: this.reviewName || 'Anonymous', rate: this.checkedStars, date: this.date, id: utilService.makeId() }
            this.$emit('addReview', review)
            this.resetVars()
        },
        resetVars() {
            this.reviewName = ''
            this.checkedStars = 3
            this.resetDate()
        },
        resetDate() {
            const currentDate = new Date()
            const year = currentDate.getFullYear()
            const month = String(currentDate.getMonth() + 1).padStart(2, '0')
            const day = String(currentDate.getDate()).padStart(2, '0')
            const formattedDate = `${year}-${month}-${day}`
            this.date = formattedDate
        },
        currHover(num) {
            this.hoverStar = num
        },
        isHover(num) {
            return num <= this.hoverStar
        },
    },
    watch: {
    },
    computed: {
    },
    components: {
    },
}