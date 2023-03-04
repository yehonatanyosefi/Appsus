export default {
     props: [],
     template: `
     <div class="color-picker" @blur="exitColorPicker" tabindex="0" @click.stop ref="labelPicker">
          <div v-for="color in colorPicker" @click.stop="chooseColor(color.val)" class="label-div" :style="'Background-color: '+color.val+';'" :title="color.name"></div>
     </div>
`,
     data() {
          return {
               colorPicker: [
                    { name: 'Critical', val: '#eb5a46' },
                    { name: 'Family', val: '#0079bf' },
                    { name: 'Work', val: '#61bd4f' },
                    { name: 'Friends', val: '#f2d600' },
                    { name: 'Spam', val: '#ff9f1a' },
                    { name: 'Memories', val: '#c377e0' },
                    { name: 'Romantic', val: '#0098b7' },
               ],
          }
     },
     methods: {
          chooseColor(val) {
               this.$emit('chooseColor', val)
          },
          exitColorPicker() {
               this.$emit('exitColorPicker')
          },
     },
     computed: {

     },
     created() {

     },
     mounted() {
          this.$refs.labelPicker.focus()
     },
     components: {

     },
}