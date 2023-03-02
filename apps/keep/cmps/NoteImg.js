export default {
     props: ['note', 'isPreview'],
     template: `
     <div class="flex justify-center align-center">
          <img :src="note.info.url" style="max-width:150px;">
     </div>
`,
     data() {
          return {

          }
     },
     methods: {

     },
     computed: {

     },
     created() {

     },
     components: {

     },
}