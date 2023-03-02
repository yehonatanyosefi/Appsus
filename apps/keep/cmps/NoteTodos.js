import { utilService } from "../../../services/util.service.js"
export default {
     props: ['note'],
     template: `
          <ul class="clean-list">
               <li v-for="todo,idx in note.info.todos" key="idx" class="flex todo-item">
                         <button @click="toggleTodoCheck(idx)"  title="Check Todo">
                              <i class="fa-regular fa-square-check" v-if="todo.doneAt"></i>
                              <i class="fa-regular fa-square" v-else></i>
                         </button>
                         <textarea v-model="todo.txt" @input="updateNote(idx)" placeholder="text"
                         :class="{'striked':todo.doneAt}" :ref="'textArea'+idx"></textarea>
          <button @click="deleteTodo(idx)" title="Delete Todo">
               <i class="fa-solid fa-xmark"></i>
                         </button >
               </li >
     <li>
          <button @click="addTodo" title="Add New Todo">
          <i class="fa-solid fa-plus"></i>
     </button>
               </li >
          </ul >
     `,
     data() {
          return {
          }
     },
     methods: {
          resizeTA(idx) {
               const elName = 'textArea' + idx
               const element = this.$refs[elName]
               if (!element || !element[0]) return
               element[0].style.height = '45px'
               element[0].style.height = element[0].scrollHeight + 12 + 'px'
          },
          resizeAllTA() {
               this.note.info.todos.forEach((todo, idx) => {
                    this.resizeTA(idx)
               })
          },
          updateNote(idx) {
               this.resizeTA(idx)
               this.$emit('updateNote', this.note)
          },
          deleteTodo(idx) {
               this.$emit('deleteTodo', this.note.id, idx)
          },
          addTodo() {
               this.$emit('addTodo', this.note.id)
          },
          toggleTodoCheck(idx) {
               this.$emit('toggleTodoCheck', this.note.id, idx)
          },
     },
     computed: {
          debouncedResizeAllTA() {
               return utilService.debounce(this.resizeAllTA, 250)
          },
     },
     watch: {
          'note.info.todos'() {
               setTimeout(() => {
                    this.resizeAllTA()
               }, 0)
          }
     },
     mounted() {
          this.resizeAllTA()
          window.addEventListener("resize", this.debouncedResizeAllTA)
     },
     unmounted() {
          this.note.info.todos.forEach((todo, idx) => {
               const elName = 'textArea' + idx
               const element = this.$refs[elName]
               if (element[0]) window.removeEventListener('resize', this.debouncedResizeAllTA)
          })
     },
     components: {

     },
}