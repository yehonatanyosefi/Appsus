export default {
    props: ['txt', 'length'],
    template: `
       <p>{{ bodyText }}<span v-if="isShowingMore">...</span>
       <button  v-if="ShowMore" @click="toggleExpand">{{ moreTxt }}</button></p>
   `,
    data() {
         return {
              isExpanded: false,
         }
    },
    methods: {
         toggleExpand() {
              this.isExpanded = !this.isExpanded
         },
    },
    computed: {
         ShowMore() {
              return this.txt.length > this.length
         },
         bodyText() {
              if (this.ShowMore && !this.isExpanded)
                   return this.txt.substring(0, this.length)
              return this.txt
         },
         moreTxt() {
              return !this.isExpanded ? '...Read More' : 'Read Less'
         },
         isShowingMore() {
              return this.ShowMore && !this.isExpanded
         },
    },
}