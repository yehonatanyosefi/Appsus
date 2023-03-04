import { utilService } from "../../../services/util.service.js"
export default {
     props: ['note', 'isPreview', 'isFocus'],
     template: `
          <ul class="clean-list note-component">
               <li v-for="todo,idx in formattedTodos" key="idx" class="flex todo-item"
                    draggable="true" droppable="true"
                    @dragstart="dragStart($event,todo.id)"
                    @drop="onDrop($event,todo.id)"
                    @dragenter.prevent
                    @dragover.prevent>
                         <button title="Drag me" v-if="!isPreview" class="drag-btn">
                              <i class="fa-solid fa-grip-vertical"></i>
                         </button>
                         <button @click.stop="toggleTodoCheck(todo.id)" title="Toggle Todo">
                              <i class="fa-regular fa-square-check" v-if="todo.doneAt"></i>
                              <i class="fa-regular fa-square" v-else></i>
                         </button>
                              
                         <p v-if="isPreview" class="preview-text" :class="{'striked':todo.doneAt}">{{todo.txt}}</p>
                         <textarea v-else v-model="todo.txt" @input="updateNote(idx)"
                         placeholder="text" :class="{'striked':todo.doneAt}" :ref="'textArea'+idx"></textarea>
                         <button v-if="!isPreview" @click="deleteTodo(todo.id)" title="Delete Todo" class="delete-todo-btn">
                              <i class="fa-solid fa-xmark"></i>
                         </button >
               </li >
               <li v-if="isLongList" class="flex todo-item">
                         <button style="opacity:0;cursor:auto;">
                              <i class="fa-regular fa-square"></i>
                         </button>
                    <p class="preview-text">...</p>
               </li>
                    <li>
                         <button v-if="!isPreview" @click.stop="addTodo" title="Add New Todo">
                         <i class="fa-solid fa-plus"></i>
                    </button>
               </li >
          </ul >
     `,
     data() {
          return {
               isLongList: false,
          }
     },
     methods: {
          resizeTA(idx) {
               const elName = 'textArea' + idx
               const element = this.$refs[elName]
               if (!element || !element[0]) return
               element[0].style.height = '45px'
               element[0].style.height = element[0].scrollHeight + 6 + 'px'
          },
          resizeAllTA() {
               if (this.note.type !== "NoteTodos") return
               this.note.info.todos.forEach((todo, idx) => {
                    this.resizeTA(idx)
               })
          },
          updateNote(idx) {
               this.resizeTA(idx)
               this.$emit('updateNote', this.note)
          },
          deleteTodo(todoId) {
               this.$emit('deleteTodo', this.note.id, todoId)
          },
          addTodo() {
               this.$emit('addTodo', this.note.id)
               setTimeout(() => {
                    const idx = this.note.info.todos.length - 1
                    const elName = 'textArea' + idx
                    const element = this.$refs[elName][0]
                    element.focus()
               }, 100)
          },
          toggleTodoCheck(todoId) {
               this.$emit('toggleTodoCheck', this.note.id, todoId)
          },
          dragStart(ev, todoId) {
               ev.dataTransfer.dropEffect = 'move'
               ev.dataTransfer.effectAllowed = 'move'
               ev.dataTransfer.setData('todoId', todoId)
          },
          onDrop(ev, todoId) {
               const todoIdSender = ev.dataTransfer.getData('todoId')
               const exchangeInfo = { noteId: this.note.id, senderId: todoIdSender, receiverId: todoId }
               this.$emit('exchangeTodos', exchangeInfo)
          },
          previewNote() {
               this.isLongList = true
               return this.note.info.todos.slice(0, 7)
          },
     },
     computed: {
          debouncedResizeAllTA() {
               return utilService.debounce(this.resizeAllTA, 250)
          },
          formattedTodos() {
               if (this.note.info.todos.length > 7 && this.isPreview) return this.previewNote()
               return this.note.info.todos
          },
     },
     watch: {
          'note.info.todos.length'() {
               setTimeout(() => {
                    this.resizeAllTA()
               }, 0)
          }
     },
     mounted() {
          if (!this.isPreview) {
               this.resizeAllTA()
               window.addEventListener("resize", this.debouncedResizeAllTA)
          }
          if (this.isFocus) this.$refs.textArea0[0].focus()
     },
     unmounted() {
          if (!this.isPreview && this.note.type === "NoteTodos") {
               this.note.info.todos.forEach((todo, idx) => {
                    const elName = 'textArea' + idx
                    const element = this.$refs[elName]
                    if (element[0]) window.removeEventListener('resize', this.debouncedResizeAllTA)
               })
          }
     },
     components: {

     },
}