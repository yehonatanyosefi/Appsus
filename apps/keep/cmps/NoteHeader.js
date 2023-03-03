import { svgService } from "../../../services/svg.service.js"
import { setFilterBy } from "../../../services/event-bus.service.js"
export default {
     props: [],
     template: `
               <button>☰</button>
               <div class="logo-container flex justify-between align-center">
                    <img class="logo" src="../../../assets/img/keep.png">
                    <span class="logo-txt">Keep</span>
               </div>
               <div class="notes-search">
                    <input type="search" placeholder="Search" class="notes-search" v-model="searchVal" @input="search">
               </div>
               <nav><button v-html="getSvg('navigator')"></button></nav>
               <img class="user-profile" src="../../../assets/img/yehonatan.png">
`,
     data() {
          return {
               searchVal: '',
          }
     },
     methods: {
          getSvg(iconName) {
               return svgService.getNoteSvg(iconName)
          },
          search() {
               const filterBy = { val: 'search', setVal: this.searchVal }
               setFilterBy(filterBy)
          }
     },
     computed: {

     },
     created() {

     },
     components: {

     },
}