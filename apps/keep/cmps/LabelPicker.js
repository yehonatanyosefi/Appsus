export default {
     props: [],
     template: `
     <div class="color-picker" @blur="exitColorPicker" tabindex="0" @click.stop ref="colorPicker">
          <div v-for="color in colorPicker" @click.stop="chooseColor(color.val)" class="color-div" :style="'Background-color: '+color.val+';'" :title="color.name"></div>
     </div>
`,
     data() {
          return {
               colorPicker: [
                    { name: 'Default', val: '#ffffff' },
                    { name: 'Critical', val: '#f28b82' },
                    { name: 'Orange', val: '#fbbc04' },
                    { name: 'Yellow', val: '#fff475' },
                    { name: 'Green', val: '#ccff90' },
                    { name: 'Teal', val: '#a7ffeb' },
                    { name: 'Blue', val: '#cbf0f8' },
                    { name: 'Dark blue', val: '#aecbfa' },
                    { name: 'Purple', val: '#d7aefb' },
                    { name: 'Pink', val: '#fdcfe8' },
                    { name: 'Brown', val: '#e6c9a8' },
                    { name: 'Gray', val: '#e8eaed' },
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
          this.$refs.colorPicker.focus()
     },
     components: {

     },
}