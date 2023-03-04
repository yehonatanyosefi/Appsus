import { utilService } from '../../../services/util.service.js'

export default {
  template: `
        <section class="home-page">
            <section class="butns">
            <!-- <RouterLink :to="'/mail"><button  @mouseover="animateBtn('mail')" ref="mail" class="mail">Mail</button></RouterLink> -->
                <button  @mouseover="animateBtn('mail')" ref="mail" class="mail">Mail</button>
                <button @mouseover="animateBtn('notes')" ref="notes" class="notes">Notes</button>
                <button @mouseover="animateBtn('books')" ref="books" class="books">Books</button>
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
      utilService.animateCSS(this.$refs[btn], 'pulse')
    }
  },
  mounted() {
    this.animateTitleNoMouse()
    this.animInterval = setInterval(this.animateTitleNoMouse, 3500)

  },
  unmounted() {
    clearInterval(this.animInterval)
  },
}

