import NoteTodos from "./NoteTodos.js"
import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"
import { uploadService } from "../../../services/upload.service.js"
import { utilService } from "../../../services/util.service.js"

export default {
     props: ['note'],
     template: `
     <div class="note-details" :style="'backgroundColor:'+note.style.backgroundColor+';'"
          :class="isShow"
          @mouseover="isHover = true"
          @mouseleave="isHover = false">
          <div class="flex justify-between align-center">
               <textarea v-model="note.info.title" @input="updateTitle" class="note-title"
               placeholder="Title" ref="textAreaTitle"></textarea>
               <button @click="togglePin" title="Toggle Pinned Items" :class="isHidden">
                    <i class="fa-solid fa-thumbtack"></i>
               </button>
          </div>
          <component  class="note-component" :is="note.type" :note="note" :isPreview="false"
               @updateNote="updateNote"
               @deleteTodo="deleteTodo"
               @addTodo="addTodo"
               @toggleTodoCheck="toggleTodoCheck" />
          <div class="button-container">
               <div class="color-wrapper">
                    <input type="color" v-model="note.style.backgroundColor" @input="updateInternal"  title="Change Background Color">
               </div>
               <label :for="note.id" class="upload-btn" title="Upload Image">
                    <input
                         class="upload-btn"
                         type="file"
                         :id="note.id"
                         :name="note.id"
                         @change="upload($event, note.id)"
                         hidden />
                    <i class="fa-regular fa-image upload-btn"></i>
               </label>
               <button class="" v-if="note.type !== 'NoteImg'" @click="toggleTodos" title="Checklist Toggle">
                    <i class="fa-regular fa-square-check note-btn"></i>
               </button>
               <button @click="duplicateNote" title="Duplicate Note">
                    <i class="fa-regular fa-clone"></i>
               </button>
               <button @click="deleteNote" title="Delete Note" class="note-btn">
                    <i class="fa-solid fa-trash note-btn"></i>
               </button>
          </div>
     </div>
     `,
     data() {
          return {
               isHover: false,
               isShow: '',
          }
     },
     methods: {
          upload(ev) {
               uploadService.onImgInput(ev, this.note)
               // .then(res => console.log(`res:`, res))
               // setTimeout(() => {
               //      const img = uploadService.getImg()
               //      this.note.type = 'NoteImg'
               //      this.note.info.url = img.src
               //      this.updateInternal()
               // }, 100);
          },
          updateTitle() {
               this.resizeTA()
               this.updateInternal()
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
          toggleTodos() {
               this.$emit('toggleTodos', this.note.id)
          },
          togglePin() {
               this.$emit('togglePin', this.note.id)
          },
          toggleTodoCheck(noteId, idx) {
               this.$emit('toggleTodoCheck', noteId, idx)
          },
          resizeTA() {
               const element = this.$refs.textAreaTitle
               element.style.height = '20px'
               element.style.height = element.scrollHeight + 12 + 'px'
          },
     },
     watch: {
     },
     computed: {
          isHidden() {
               return { 'hide': !this.isHover && !this.note.isPinned }
          },
          debouncedResizeTA() {
               return utilService.debounce(this.resizeTA, 250)
          },
     },
     mounted() {
          window.addEventListener("resize", this.debouncedResizeTA)
          setTimeout(() => this.resizeTA(), 0)
          setTimeout(() => this.isShow = 'show', 10)
     },
     unmounted() {
          window.removeEventListener('resize', this.debouncedResizeTA)
     },
     components: {
          NoteTodos,
          NoteTxt,
          NoteImg,
     },
}