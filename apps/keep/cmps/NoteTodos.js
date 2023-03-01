export default {
     props: ['note'],
     template: `
          <ul class="clean-list">
               <li v-for="todo,idx in note.info.todos" key="idx" class="flex">
                         <button @click="toggleTodoCheck(idx)">
                              <i class="fa-regular fa-square-check" v-if="todo.doneAt"></i>
                              <i class="fa-regular fa-square" v-else></i>
                         </button>
                         <input v-model="todo.txt" @input="updateNote" placeholder="text"
                         class="{'striked':todo.doneAt}">
          <button @click="deleteTodo(idx)" title = "Delete Todo" >
               <i class="fa-solid fa-xmark"></i>
                         </button >
               </li >
     <li>
          <button @click="addTodo" title="Add New Todo">
          <i class="fa-solid fa-plus"></i>
     </button>
               </li >
          </ul >
     `, //TODO: ask does each todo need id?
     data() {
          return {
          }
     },
     methods: {
          updateNote() {
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
     },
     created() {

     },
     components: {

     },
}