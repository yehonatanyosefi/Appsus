
export default {
     template: `
         <section class="mail-filter">
             <label htmlFor="byName">Filter By Name: 
                 <input 
                     id="byName"
                     v-model="filterBy.body"
                     @input="filter" 
                     placeholder="Search"
                     type="text" />
             </label>
 
             <!-- <label htmlFor="byRead">Filter By Price: 
                 <input 
                     id="byRead"
                     v-model="filterBy.isRead"
                     @input="filter" 
                     type="range" /> <span>{{filterBy.price}}</span>
             </label> -->
         </section>
     `,
     data() {
         return {
             filterBy: { isRead: '', body: '' },
         }
     },
     methods: {
         filter(){
             this.$emit('filter', this.filterBy)
         }
     }
 }