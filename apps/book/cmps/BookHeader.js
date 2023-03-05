import { svgService } from "../../../services/svg.service.js"
import BookFilter from '../cmps/BookFilter.js'
export default {
    props: ['isList'],
    template: `
        <header class="book-header">
                <RouterLink to="/book" class="logo-container" title="logo">
                        <img class="logo" src="./assets/img/book.svg">
                        <div class="logo-txt">Miss Books</div>
                </RouterLink>
                <div v-if="isList" class="center"><BookFilter @filter="filter"/></div>
                <div class="center"  v-if="isList">
                    <RouterLink v-for="({path, title}, idx) in route" :to="path" :title="title">{{title}}</RouterLink>
                </div>
                <div v-if="!isList" class="center book-home">
                    <RouterLink to="/book" title="books">Book Homepage</RouterLink>
                </div>
                <nav class="center">
                    <button v-html="getSvg('navigator')" @click="toggleIsNav"></button>
                    <img class="user-profile" src="./assets/img/dornatan.jpg" alt="Yehonatan & Dor" title="Yehonatan & Dor">
                </nav>
                <nav class="header-nav" v-if="isNav" tabindex="0" @blur="closeNav" ref="navModal">
                    <RouterLink v-for="({path, title, img}, idx) in routes" :to="path" :title="title" :key="idx">
                        <div class="nav-card">
                            <img :src="img" :title="title" :class="{'profile-nav':path==='/about'}"/>
                        </div>
                    </RouterLink>
                </nav>
        </header>
        `,
    data() {
        return {
            route: [
                { path: '/book/add', title: 'Add Book' },
            ],
            isNav: false,
            routes: [
                { path: '/', title: 'Home', img: './assets/img/logo.png' },
                { path: '/mail', title: 'Mail', img: './assets/img/gmail.png' },
                { path: '/notes', title: 'Notes', img: './assets/img/keep.png' },
                { path: '/book', title: 'Book', img: './assets/img/book.svg' },
                { path: '/about', title: 'About Us', img: './assets/img/dornatan.jpg' },
            ],
        }
    },
    methods: {
        getSvg(iconName) {
            return svgService.getNoteSvg(iconName)
        },
        setRoute(route) {
            this.$emit('set-route', route)
        },
        toggleIsNav() {
            if (!this.isNav) {
                this.isNav = true
                setTimeout(() => this.$refs.navModal.focus(), 150)
            }
            else this.isNav = false
        },
        closeNav() {
            setTimeout(() => this.isNav = false, 150)
        },
        filter(filter) {
            this.$emit('filter', filter)
        },
    },
    components: {
        BookFilter,
    },
}