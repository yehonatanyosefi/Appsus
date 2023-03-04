import NoteTodos from "./NoteTodos.js"
import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"
import { uploadService } from "../../../services/upload.service.js"
import { utilService } from "../../../services/util.service.js"
import { svgService } from "../../../services/svg.service.js"
import ColorPicker from "./ColorPicker.js"

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
                         <i v-if="note.isPinned" class="fa-solid fa-thumbtack"></i>
                         <div v-else v-html="getSvg('pinEmpty')"></div>
               </button>
          </div>
          <component  class="note-component" :is="note.type" :note="note" :isPreview="false"
               @updateNote="updateNote"
               @deleteTodo="deleteTodo"
               @addTodo="addTodo"
               @toggleTodoCheck="toggleTodoCheck"
               @exchangeTodos="exchangeTodos" />
               <p class="timestamp">Edited: {{formattedTime}}</p>
          <div class="button-container">
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
               <button class="color-wrapper" @click.stop="toggleColorPick" title="Background color">
                    <i class="fa-solid fa-palette"></i>
               </button>
               <button class="" v-if="note.type !== 'NoteImg'" @click="toggleTodos" title="Checklist Toggle">
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
          <ColorPicker v-if="isColorPicking" @chooseColor="chooseColor" @exitColorPicker="exitColorPicker" />
     </div>
     `,
     data() {
          return {
               isHover: false,
               isShow: '',
               isColorPicking: false,
          }
     },
     methods: {
          upload(ev) {
               uploadService.onImgInput(ev, this.note)
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
          deleteTodo(noteId, todoId) {
               this.$emit('deleteTodo', noteId, todoId)
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
          toggleTodoCheck(noteId, todoId) {
               this.$emit('toggleTodoCheck', noteId, todoId)
          },
          exchangeTodos(exchangeInfo) {
               this.$emit('exchangeTodos', exchangeInfo)
          },
          resizeTA() {
               const element = this.$refs.textAreaTitle
               element.style.height = '20px'
               element.style.height = element.scrollHeight + 6 + 'px'
          },
          restoreNote() {
               this.$emit('restoreNote', this.note.id)
          },
          getSvg(iconName) {
               return svgService.getNoteSvg(iconName)
          },
          chooseColor(val) {
               this.note.style.backgroundColor = val
               this.updateInternal()
          },
          exitColorPicker() {
               setTimeout(() => this.isColorPicking = false, 100)
          },
          toggleColorPick() {
               this.isColorPicking = !this.isColorPicking
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
          formattedTime() {
               const timestamp = this.note.createdAt
               const now = Date.now()
               const diff = now - timestamp
               const minute = 60 * 1000
               const hour = 60 * minute
               const day = 24 * hour
               const week = 7 * day

               if (diff < minute) {
                    return 'just now';
               } else if (diff < hour) {
                    const minutes = Math.floor(diff / minute)
                    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
               } else if (diff < day) {
                    const hours = Math.floor(diff / hour)
                    return `${hours} hour${hours === 1 ? '' : 's'} ago`
               } else if (diff < week) {
                    const days = Math.floor(diff / day)
                    return `${days} day${days === 1 ? '' : 's'} ago`
               } else {
                    const date = new Date(timestamp)
                    const day = date.getDate()
                    const month = date.toLocaleString('default', { month: 'long' });
                    const year = date.getFullYear()
                    return `${day} ${month} ${year}`
               }
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
          ColorPicker,
     },
}