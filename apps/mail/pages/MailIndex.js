import MailList from "../cmps/MailList.js"
export default {
     props: [],
     template: `
     <header>
          <button class="toggle-menu"></button>
          <div className="logo"></div>
     </header>
     Sagarno ta pina
     <MailList />
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
          MailList,
     },
}