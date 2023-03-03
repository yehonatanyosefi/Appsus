import { setFilterBy } from "../../../services/event-bus.service.js"
export default {
     props: [],
     template: `
          <button @click="setFilter('notes')" :class="{ 'side-selected': isSelected(1) }" title="Notes">
               <i class="fa-regular fa-lightbulb"></i>
          </button>
          <button @click="setFilter('deleted')" :class="{ 'side-selected': isSelected(2) }" title="Trash Bin">
               <i class="fa-solid fa-trash"></i>
          </button>
`,
     data() {
          return {
               buttonSelected: 1,
          }
     },
     methods: {
          setFilter(val) {
               const filterBy = {}
               switch (val) {
                    case 'notes':
                         filterBy.val = 'deleted'
                         filterBy.setVal = false
                         this.buttonSelected = 1
                         break
                    case 'deleted':
                         filterBy.val = 'deleted'
                         filterBy.setVal = true
                         this.buttonSelected = 2
                         break
               }
               setFilterBy(filterBy)
          },
          isSelected(num) {
               return this.buttonSelected === num
          },
     },
     computed: {
     },
     created() {

     },
     components: {

     },
}