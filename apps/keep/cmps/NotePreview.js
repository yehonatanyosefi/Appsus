import NoteTodos from "./NoteTodos.js"
import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"
import { uploadService } from "../../../services/upload.service.js"
import { utilService } from "../../../services/util.service.js"

export default {
     props: ['note'],
     template: `
     <div class="note-card" :style="'backgroundColor:'+note.style.backgroundColor+';'"
          @mouseover="isHover = true"
          @mouseleave="isHover = false"
          @click="openNote">
          <div class="flex justify-between align-center">
               <p class="note-title">
                    {{note.info.title}}
                    <span v-if="!note.info.title">Title</span>
               </p>
               <button @click.stop="togglePin" title="Toggle Pinned Items" :class="isHidden">
                    <i class="fa-solid fa-thumbtack"></i>
               </button>
          </div>
          <component :is="note.type" :note="note" isPreview="true"
               @updateNote="updateNote"
               @deleteTodo="deleteTodo"
               @addTodo="addTodo"
               @toggleTodoCheck="toggleTodoCheck" />
          <div class="button-container">
               <div class="color-wrapper">
                    <input @click.stop type="color" v-model="note.style.backgroundColor" @input="updateInternal"  title="Change Background Color">
               </div>
               <label :for="note.id" class="upload-btn" title="Upload Image" @click.stop>
                    <input @click.stop
                         class="upload-btn"
                         type="file"
                         :id="note.id"
                         :name="note.id"
                         @change="upload"
                         hidden />
                    <i class="fa-regular fa-image upload-btn"></i>
               </label>
               <button class="" v-if="note.type !== 'NoteImg'" @click.stop="toggleTodos" title="Checklist Toggle">
                    <i class="fa-regular fa-square-check note-btn"></i>
               </button>
               <button @click.stop="duplicateNote" title="Duplicate Note">
                    <i class="fa-regular fa-clone"></i>
               </button>
               <button @click.stop="deleteNote" title="Delete Note" class="note-btn">
                    <i class="fa-solid fa-trash note-btn"></i>
               </button>
          </div>
     </div>
     `,
     data() {
          return {
               isHover: false,
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
          openNote() {
               this.$emit('openNote', this.note.id)
          },
     },
     watch: {
     },
     computed: {
          isHidden() {
               return { 'hide': !this.isHover && !this.note.isPinned }
          },
     },
     mounted() {
     },
     unmounted() {
     },
     components: {
          NoteTodos,
          NoteTxt,
          NoteImg,
     },
}