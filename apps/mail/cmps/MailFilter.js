
export default {
     template: `
         <section class="mail-filter">
                 <input 
                     id="searchMail"
                     type="search"
                     v-model="filterBy.mailTxt"
                     @input="filter" 
                     placeholder="Search Mail" />
         </section>
     `,
     data() {
         return {
             filterBy: { mailTxt: ''},
         }
     },
     methods: {
         filter(){
             this.$emit('filter', this.filterBy)
         }
     }
 }