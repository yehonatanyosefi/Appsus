import { svgService } from "../services/svg.service.js"
export default {
    template: `
        <section class="about-page grid">
                <!-- <h1 class="center">About us</h1> -->
                <button v-html="getSvg('navigator')" @click="toggleIsNav" class="about-nav"></button>
                
                <h3 class="center">AppSus team</h3>
                <div class="about-card-container center">
                    <div class="about-card yehonatan center flex flex-column">
                        <img src="./assets/img/yehonatan.png" class="about-img" title="Yehonatan Yosefi">
                        <h2>Yehonatan Yosefi</h2>
                        <h5>Coded primarily the Notes app</h5>
                    </div>
                    <div class="about-card dor center flex flex-column">
                        <img src="./assets/img/dor.jfif" class="about-img" title="Dor Toledano">
                        <h2>Dor Toledano</h2>
                        <h5>Coded primarily the Mail app</h5>
                    </div>
                </div>
                    <nav class="header-nav" v-if="isNav" tabindex="0" @blur="closeNav" ref="navModal">
                         <RouterLink v-for="({path, title, img}, idx) in routes" :to="path" :title="title" :key="idx">
                              <div class="nav-card">
                                   <img :src="img" :title="title" :class="{'profile-nav':path==='/about'}"/>
                              </div>
                         </RouterLink>
                    </nav>
        </section>
    `,
    data() {
        return {
            isNav: false,
            routes: [
                { path: '/', title: 'Home', img: '../.././assets/img/logo.png' },
                { path: '/mail', title: 'Mail', img: '../.././assets/img/gmail.png' },
                { path: '/notes', title: 'Notes', img: '../.././assets/img/keep.png' },
                { path: '/book', title: 'Book', img: '../.././assets/img/book.svg' },
                { path: '/about', title: 'About Us', img: '../.././assets/img/dornatan.jpg' },
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

    },
    computed: {

    },
    created() {

    },
    components: {

    },
}