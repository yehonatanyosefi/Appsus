export default {
  template: `
        <section class="home-page">
            <h1  @mouseover="animateTitle" data-value="Appsus">{{ title }}</h1>

            <a id="source-link" class="meta-link" href="https://kprverse.com" target="_blank">
            <!-- <i class="fa-solid fa-link"></i>
            <span>Source</span>
            </a> -->

            <!-- <a id="yt-link" class="meta-link" href="https://youtu.be/W5oawMJaXbU" target="_blank">
            <i class="fa-brands fa-youtube"></i>
            <span>2 min tutorial</span>
            </a> -->

        </section>
    `,
    data() {
      return {
        title: "Hello World",
        letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        interval: null,
      };
    },
    methods: {
      animateTitle(event) {
        let iteration = 0;
  
        clearInterval(this.interval);
  
        this.interval = setInterval(() => {
          this.title = this.title
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return event.target.dataset.value[index];
              }
  
              return this.letters[Math.floor(Math.random() * 26)];
            })
            .join("");
  
          if (iteration >= event.target.dataset.value.length) {
            clearInterval(this.interval);
          }
  
          iteration += 1 / 3;
        }, 30);
      },
    },
  };

