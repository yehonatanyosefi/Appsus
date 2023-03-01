export default {
     props: ['note'],
     template: `
          <ul class="clean-list">
               <li v-for="todo,idx in note.info.todos" key="idx" class="flex">
                         <input v-model="todo.txt" @input="updateNote" placeholder="text">
                         <button @click="deleteTodo(idx)">X</button>
               </li>
               <li><button @click="addTodo">add</button></li>
          </ul>
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
     },
     computed: {
     },
     created() {

     },
     components: {

     },
}