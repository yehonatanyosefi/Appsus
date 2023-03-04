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
     <div class="note-card" :style="'backgroundColor:'+note.style.backgroundColor+';'"
          @mouseover="isHover = true"
          @mouseleave="isHover = false"
          @click="openNote"
          draggable="true" droppable="true"
          @dragstart="dragStart($event,note.id)"
          @drop="onDrop($event,note.id)"
          @dragenter.prevent
          @dragover.prevent>
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
               <button class="color-wrapper" @click.stop="toggleColorPick" title="Background color">
                    <i class="fa-solid fa-palette"></i>
               </button>
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
          <ColorPicker v-if="isColorPicking" @chooseColor="chooseColor" @exitColorPicker="exitColorPicker" />
     </div>
     `,
     data() {
          return {
               isHover: false,
               isColorPicking: false,
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
          openNote() {
               this.$emit('openNote', this.note.id)
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
          dragStart(ev, noteId) {
               ev.dataTransfer.dropEffect = 'move'
               ev.dataTransfer.effectAllowed = 'move'
               ev.dataTransfer.setData('noteId', noteId)
          },
          onDrop(ev, noteId) {
               const noteIdSender = ev.dataTransfer.getData('noteId')
               const exchangeInfo = { senderId: noteIdSender, receiverId: noteId }
               this.$emit('exchangeNotes', exchangeInfo)
          }
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
          ColorPicker,
     },
}