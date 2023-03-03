import { svgService } from "../../../services/svg.service.js"
import { setFilterBy } from "../../../services/event-bus.service.js"
export default {
     props: [],
     template: `
               <header class="notes-header">
               <!-- <button>☰</button> -->
               <div class="logo-container flex justify-between align-center">
                    <img class="logo" src="../../../assets/img/keep.png">
                    <span class="logo-txt">Keep</span>
               </div>
               <div class="notes-search">
                    <input type="search" placeholder="Search" class="notes-search" v-model="searchVal" @input="search">
               </div>
               <button v-html="getSvg('navigator')" @click="toggleIsNav"></button>
               <img class="user-profile" src="../../../assets/img/yehonatan.png">

               <nav v-if="isNav" class="header-nav">
                    <RouterLink v-for="({path, title}, idx) in routes" :to="path" :title="title"
                    class="">{{title}}</RouterLink>
               </nav>
               </header>
`,
     data() {
          return {
               searchVal: '',
               routes: [
                    { path: '/', title: 'Home' },
                    { path: '/mail', title: 'Mail' },
                    { path: '/note', title: 'Note' },
                    { path: '/about', title: 'About' },
               ],
               isNav: false,
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
          },
     },
     computed: {

     },
     created() {

     },
     components: {

     },
}