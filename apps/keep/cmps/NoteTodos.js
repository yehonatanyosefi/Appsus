export default {
     props: ['note'],
     template: `
     
               <h2>I'm a list yo</h2> 
               <template v-for="todo,idx in note.info.todos" key="idx">
                    <p> DO ME - {{todo.txt}} </p>
               </template>
`,
     data() {
          return {

          }
     },
     methods: {

     },
     computed: {

     },
     created() {

     },
     components: {

     },
}