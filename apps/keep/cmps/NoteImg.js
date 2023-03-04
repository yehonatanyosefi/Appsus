import NoteTxt from "./NoteTxt.js"
export default {
     props: ['note', 'isPreview'],
     template: `
     <div class="NoteImg">
          <div class="flex justify-center align-center">
               <img :src="note.info.url" style="max-width:150px;">
          </div>
          <NoteTxt v-if="!isPreview || note.info.txt" :note="note" :isPreview="isPreview" :isFocus="false" @updateNote="updateNote"/>
     </div>
`,
     data() {
          return {

          }
     },
     methods: {
          updateNote() {
               this.$emit('updateNote', this.note)
          },
     },
     computed: {

     },
     created() {

     },
     components: {
          NoteTxt,
     },
}