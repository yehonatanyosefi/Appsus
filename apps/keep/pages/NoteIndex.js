import { noteService } from "../services/note.service.js"
export default {
     props: [],
     template: `
          {{notes}}
     `,
     data() {
          return {
               notes: noteService.gNotes,
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