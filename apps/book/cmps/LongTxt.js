export default {
     props: ['txt', 'length'],
     template: `
        <p>{{ descriptionText }}<span v-if="isShowingMore">...</span>
        <button  v-if="canShowMore" @click="toggleExpand">{{ moreTxt }}</button></p>
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
          canShowMore() {
               return this.txt.length > this.length
          },
          descriptionText() {
               if (this.canShowMore && !this.isExpanded)
                    return this.txt.substring(0, this.length)
               return this.txt
          },
          moreTxt() {
               return !this.isExpanded ? ' more...' : ' ...less'
          },
          isShowingMore() {
               return this.canShowMore && !this.isExpanded
          },
     },
}