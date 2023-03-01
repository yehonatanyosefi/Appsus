import NoteList from "../cmps/NoteList.js"
export default {
     props: [],
     template: `
          <noteList />
          {{hello yehonatan}}
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
          NoteList,
     },
}