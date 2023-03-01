import MailList from "../cmps/MailList.js"
export default {
     props: [],
     template: `
     <header class="flex justify-between">
          <button class="toggle-menu x fa-solid fa-bars"> </button>
          <div className="logo fa-duotone fa-m">SusMail</div>
          <!-- <button class="logo fa-duotone fa-m">SusMail</button> -->
          <input type="text" placeholder="🔎 Search Mail"/>
          <div className="menu-buttons">
               <button class="apps-menu">apps menu</button>
               <button class="user">User</button>
          </div>
     </header>
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