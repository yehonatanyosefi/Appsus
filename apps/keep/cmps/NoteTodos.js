export default {
     props: ['note'],
     template: `

          <ul>
               <li v-for="todo,idx in note.info.todos" key="idx" class="clean-list">
                    <textarea v-model="todo.txt" @input="updateNote"></textarea>
               </li>
          </ul>
`,
     data() {
          return {
          }
     },
     methods: {
          updateNote() {
               this.$emit('updateNote', this.note)
          },

     },
     computed: {

     },
     created() {

     },
     components: {

     },
}