import { utilService } from '../../../services/util.service.js'

export default {
  template: `
        <section class="home-page">
            <section class="butns">
              <RouterLink :to="'/mail'">
                  <button  @mouseover="animateBtn('mail')" ref="mail" class="mail" title="Mail">
                    <img class="home-img" src="../assets/img/gmail.png">
                  </button>
              </RouterLink>
              <RouterLink :to="'/notes'">
                  <button @mouseover="animateBtn('notes')" ref="notes" class="notes" title="Notes">
                    <img class="home-img" src="../assets/img/keep.png">
                  </button>
                  </RouterLink>
              <RouterLink :to="'/book'">
                  <button @mouseover="animateBtn('books')" ref="books" class="books" title="Book">
                    <img class="home-img" src="../assets/img/book.svg">
                  </button>
              </RouterLink>
            </section>
            <div class="circle"></div>
            <h1 data-value="Appsus">{{ title }}</h1>
        </section>
    `,
  data() {
    return {
      title: `Appsus`,
      letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      interval: null,
      animInterval: null,
      btnInterval: null,
      currAnimation: 0,
      btns: ['mail', 'notes', 'books']
    }
  },
  methods: {
    animateTitleNoMouse() {
      let iteration = 0
      const word = 'Appsus'
      clearInterval(this.interval)
      this.interval = setInterval(() => {
        this.title = this.title
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return word[index]
            }
            return this.letters[Math.floor(Math.random() * 26)]
          })
          .join('')
        if (iteration >= word) {
          clearInterval(this.interval)
        }
        iteration += 1 / 3
      }, 30)
    },
    animateBtn(btn) {
      utilService.animateCSS(this.$refs[btn], 'flip')
    },
    animateBtns() {
      if (!this.btns[this.currAnimation]) {
        this.currAnimation++
        if (this.currAnimation >= 6) this.currAnimation = 0
        return
      }
      const btn = this.btns[this.currAnimation]
      // utilService.animateCSS(this.$refs[btn], 'pulse')
      this.currAnimation++
      if (this.currAnimation >= 6) this.currAnimation = 0
    }
  },
  mounted() {
    this.animateTitleNoMouse()
    this.btnInterval = setInterval(this.animateBtns, 750)
    this.animInterval = setInterval(this.animateTitleNoMouse, 3500)

  },
  unmounted() {
    clearInterval(this.btnInterval)
    clearInterval(this.animInterval)
  },
}

