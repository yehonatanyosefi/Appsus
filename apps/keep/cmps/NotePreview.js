import NoteTodos from "./NoteTodos.js"
import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"
import { uploadService } from "../../../services/upload.service.js"
// import vueSwatches from "../../../assets/style/swatches/vueSwatches.js" //TODO: ask about swatches

export default {
     props: ['note'],
     template: `
     <div class="note-card" :style="'backgroundColor:'+note.style.backgroundColor+';'"
          @mouseover="isHover = true"
          @mouseleave="isHover = false">
          <input v-model="note.info.title" @input="updateInternal" class="note-title">
          <component :is="note.type" :note="note"
               @updateNote="updateNote"
               @deleteTodo="deleteTodo"
               @addTodo="addTodo"
               />
          <div class="button-container flex" :class="isHidden">
               <button @click="deleteNote">delete me</button>
               <div class="color-wrapper">
                    <input type="color" v-model="note.style.backgroundColor" @input="updateInternal">
               </div>
               <label :for="note.id" class="upload-btn">
                    <input 
                         type="file"
                         :id="note.id"
                         :name="note.id"
                         @change="upload($event, note.id)"
                         hidden />
                    <i class="fa-solid fa-file-arrow-up"></i>
          </label>
               <button @click="duplicateNote">duplicate</button>
          </div>
     </div>
     `,
     data() {
          return {
               isHover: false,
          }
     },
     methods: {
          upload(ev) { //TODO: fix bug it shows only on first note
               uploadService.onImgInput(ev)
               setTimeout(() => {
                    const img = uploadService.getImg()
                    this.note.type = 'NoteImg'
                    this.note.info.url = img.src
                    this.updateInternal()
               }, 100);
          },
          updateInternal() {
               this.updateNote(this.note)
          },
          updateNote(updatedNote) {
               this.$emit('updateNote', updatedNote)
          },
          duplicateNote() {
               this.$emit('duplicateNote', this.note.id)
          },
          deleteNote() {
               this.$emit('deleteNote', this.note.id)
          },
          deleteTodo(noteId, idx) {
               this.$emit('deleteTodo', noteId, idx)
          },
          addTodo(noteId) {
               this.$emit('addTodo', noteId)
          },
     },
     watch: {
          bgColor() {
               console.log(`this.bgColor:`, this.bgColor)
          },
     },
     computed: {
          isHidden() {
               return { 'hide': !this.isHover }
          },
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