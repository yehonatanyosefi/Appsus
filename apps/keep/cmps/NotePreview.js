import NoteTodos from "./NoteTodos.js"
import NoteTxt from "./NoteTxt.js"
import NoteImg from "./NoteImg.js"

export default {
     props: ['note'],
     template: `
     <component :is="note.type" :note="note" />
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
          NoteTodos,
          NoteTxt,
          NoteImg,
     },
}