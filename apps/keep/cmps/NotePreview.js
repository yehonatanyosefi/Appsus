import NoteTodos from "./NoteTodos.js"
import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"
// import vueSwatches from "../../../assets/style/swatches/vueSwatches.js"

export default {
     props: ['note'],
     template: `
     <div class="note-card" :style="'backgroundColor:'+note.style.backgroundColor+';'">
          <h3 class="note-title"><textarea v-model="note.info.title" @input="updateInternal"></textarea></h3>
          <hr/>
          <component :is="note.type" :note="note" @updateNote="updateNote"/>
          <nav><button @click="deleteNote">delete me</button><input type="color" v-model="note.style.backgroundColor" @input="updateInternal"></nav>
     </div>
     `,
     data() {
          return {
          }
     },
     methods: {
          updateInternal() {
               this.updateNote(this.note)
          },
          updateNote(updatedNote) {
               this.$emit('updateNote', updatedNote)
          },
          deleteNote() {
               this.$emit('deleteNote', this.note.id)
          },
     },
     watch: {
          bgColor() {
               console.log(`this.bgColor:`, this.bgColor)
          },
     },
     computed: {
     },
     created() {

     },
     components: {
          NoteTodos,
          NoteTxt,
          NoteImg,
          // VSwatches: window['vue-swatches'],
     },
}