import { noteService } from "../services/note.service.js"
export default {
     props: [],
     template: `
          {{notes}}
     `,
     data() {
          return {
               notes: null,
          }
     },
     methods: {

     },
     computed: {

     },
     created() {
          noteService.query()
               .then(notes => this.notes = notes)
     },
     components: {

     },
}