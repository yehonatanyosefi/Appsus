import NoteTodos from "./NoteTodos.js"
import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"
import { uploadService } from "../../../services/upload.service.js"
import { utilService } from "../../../services/util.service.js"
import { svgService } from "../../../services/svg.service.js"

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
                         <i v-if="note.isPinned" class="fa-solid fa-thumbtack"></i>
                         <div v-else v-html="getSvg('pinEmpty')"></div>
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
               <template v-if="!note.isDeleted">
                    <button @click.stop="duplicateNote" title="Duplicate">
                         <i class="fa-regular fa-clone"></i>
                    </button>
                    <button @click.stop="deleteNote" title="Delete" class="note-btn">
                         <i class="fa-solid fa-trash note-btn"></i>
                    </button>
               </template>
               <template v-else>
                    <button @click.stop="restoreNote" title="Restore">
                         <i class="fa-solid fa-trash-can-arrow-up"></i>
                    </button>
                    <button @click.stop="deleteNote" title="Delete Forever" class="note-btn">
                         <i class="fa-solid fa-ban"></i>
                    </button>
               </template>
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
          restoreNote() {
               this.$emit('restoreNote', this.note.id)
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
          getSvg(iconName) {
               return svgService.getNoteSvg(iconName)
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