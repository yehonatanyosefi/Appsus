import { svgService } from "../../../services/svg.service.js"
import { setFilterBy } from "../../../services/event-bus.service.js"
export default {
     props: [],
     // < !-- < button >☰</ > -->
     template: `
               <header class="notes-header">
                    <div class="logo-container flex justify-between align-center">
                         <img class="logo" src="../../../assets/img/keep.png">
                         <span class="logo-txt">Notes</span>
                    </div>
                    <div class="notes-search">
                         <input type="search" placeholder="Search" class="notes-search" v-model="searchVal" @input="search">
                    </div>
                    <button v-html="getSvg('navigator')" @click="toggleIsNav"></button>
                    <img class="user-profile" src="../../../assets/img/yehonatan.png" alt="Yehonatan Yosefi" title="Yehonatan Yosefi">
               
                    <nav class="header-nav" v-if="isNav" tabindex="0" @blur="closeNav" ref="navModal">
                         <RouterLink v-for="({path, title, img}, idx) in routes" :to="path" :title="title" :key="idx">
                              <div class="nav-card">
                                   <img :src="img" :title="title" :class="{'profile-nav':path==='/about'}"/>
                                   <p>{{title}}</p>
                              </div>
                         </RouterLink>
                    </nav>
               </header>
`,
     data() {
          return {
               searchVal: '',
               isNav: false,
               routes: [
                    { path: '/', title: 'Home', img: '../../../assets/img/logo.png' },
                    { path: '/mail', title: 'Mail', img: '../../../assets/img/gmail.png' },
                    { path: '/note', title: 'Note', img: '../../../assets/img/keep.png' },
                    // { path: '/book', title: 'Book', img: '../../../assets/img/book.svg' },
                    { path: '/about', title: 'About Us', img: '../../../assets/img/dornatan.jpg' },
               ],
          }
     },
     methods: {
          getSvg(iconName) {
               return svgService.getNoteSvg(iconName)
          },
          search() {
               const filterBy = { val: 'search', setVal: this.searchVal }
               setFilterBy(filterBy)
          },
          setRoute(route) {
               this.$emit('set-route', route)
          },
          toggleIsNav() {
               this.isNav = !this.isNav
               if (this.isNav) setTimeout(() => this.$refs.navModal.focus(), 100)
          },
          closeNav() {
               setTimeout(() => this.isNav = false, 140)
          },
     },
     computed: {

     },
     created() {

     },
     components: {
     },
}