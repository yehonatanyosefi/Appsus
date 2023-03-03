import NoteTodos from "./NoteTodos.js"
import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"
import { uploadService } from "../../../services/upload.service.js"
import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"
import { svgService } from "../../../services/svg.service.js"
import ColorPicker from "./ColorPicker.js"

export default {
     props: [],
     template: `
          <div v-if="!isMaking" class="flex justify-center align-center note-add">
               <div class="flex justify-center align-center note-add-container">
                    <input v-model="placeholderTxt" @focus="startNote" class="note-placeholder">
                    <button @click="startTodos" title="Todo List">
                         <i class="fa-regular fa-square-check"></i>
                    </button>
                    <label for="newNote" class="upload-btn" title="Upload Image" @click.stop>
                         <input @click.stop
                              class="upload-btn"
                              type="file"
                              id="newNote"
                              name="newNote"
                              @change="startImage"
                              hidden />
                         <i class="fa-regular fa-image upload-btn"></i>
                    </label>
               </div>
          </div>
          <div v-else class="note-add-card" :style="'backgroundColor:'+note.style.backgroundColor+';'">
               <div class="flex justify-between align-center">
                    <textarea v-model="note.info.title" class="note-title"
                    placeholder="Title" ref="textAreaTitle"></textarea>
                    <button @click.stop="togglePin" title="Toggle Pinned Items">
                         <i v-if="note.isPinned" class="fa-solid fa-thumbtack"></i>
                         <div v-else v-html="getSvg('pinEmpty')"></div>
                    </button>
               </div>
               <component  class="note-component" :is="note.type" :note="note"
                    :isPreview="false"
                    :isFocus="true"
                    @deleteTodo="deleteTodo"
                    @addTodo="addTodo"
                    @toggleTodoCheck="toggleTodoCheck" />
               <div class="button-container">
                    <label for="newNote" class="upload-btn" title="Upload Image" @click.stop>
                         <input @click.stop
                              class="upload-btn"
                              type="file"
                              id="newNote"
                              name="newNote"
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
                    <button @click.stop="addNote" title="Save & Close">
                         <i class="fa-solid fa-xmark"></i>
                    </button>
               </div>
          <ColorPicker v-if="isColorPicking" @chooseColor="chooseColor" @exitColorPicker="exitColorPicker" />
     </div>
          `,
     data() {
          return {
               isMaking: false,
               note: null,
               placeholderTxt: 'Take a note...',
               isColorPicking: false,
          }
     },
     methods: {
          addNote() {
               const { txt, title, url, todos } = this.note.info
               if (title || txt || url || (todos && todos.length && todos.some(todo => todo.txt))) this.$emit('addNote', this.note)
               this.resetNote()
          },
          startImage(ev) {
               this.upload(ev)
               this.note.type = 'NoteImg'
               this.startNote()
          },
          startTodos() {
               this.note.info.todos = [{ txt: '', doneAt: null }]
               this.note.type = 'NoteTodos'
               this.startNote()
          },
          startNote() {
               this.isMaking = true
               window.addEventListener("resize", this.debouncedResizeTA)
               setTimeout(() => this.resizeTA, 0)
          },
          resetNote() {
               window.removeEventListener('resize', this.debouncedResizeTA)
               this.note = noteService.getEmptyNote()
               this.isMaking = false
          },
          upload(ev) {
               uploadService.onImgInput(ev, this.note)
          },
          deleteTodo(noteId, idx) {
               this.note.info.todos.splice(idx, 1)
          },
          addTodo(noteId) {
               this.note.info.todos.push({ txt: '', doneAt: null })
          },
          toggleTodos() {
               switch (this.note.type) {
                    case 'NoteTodos':
                         this.note.type = 'NoteTxt'
                         const todosMapped = this.note.info.todos.map((todo, idx) => {
                              if (idx !== this.note.info.todos.length - 1) return todo.txt + '\n'
                              return todo.txt
                         })
                         this.note.info.txt = todosMapped.join('')
                         this.note.info.todos = null
                         break
                    case 'NoteTxt':
                         this.note.type = 'NoteTodos'
                         const todosSplitted = this.note.info.txt.split('\n')
                         this.note.info.todos = todosSplitted.map(todo => {
                              return { txt: todo, doneAt: null, }
                         })
                         this.note.info.txt = null
                         break
               }
          },
          togglePin() {
               this.note.isPinned = !this.note.isPinned
          },
          toggleTodoCheck(noteId, idx) {
               const todos = this.note.info.todos
               if (!todos[idx].doneAt) todos[idx].doneAt = Date.now()
               else todos[idx].doneAt = null
          },
          resizeTA() {
               const element = this.$refs.textAreaTitle
               element.style.height = '20px'
               element.style.height = element.scrollHeight + 6 + 'px'
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
     computed: {
          debouncedResizeTA() {
               return utilService.debounce(this.resizeTA, 250)
          },
     },
     created() {
          this.resetNote()
     },
     components: {
          NoteTodos,
          NoteTxt,
          NoteImg,
          ColorPicker,
     },
     watch: {
     }
}