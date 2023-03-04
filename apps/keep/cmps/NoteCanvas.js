export default {
     props: [],
     template: `
     <div class="canvas-modal" @blur="saveCanvas" tabindex="0" ref="canvasContainer">
    <div class="canvas-container">
      <canvas id="my-canvas" height="450" width="450"> </canvas>
</div>
    <!-- <input v-if="gCtx" type="color" v-model="gCtx.fillStyle" />
    <input v-if="gCtx" type="color" v-model="gCtx.strokeStyle" /> -->
    <!-- <select v-if="gCtx" name="shape" v-model="gCurrShape">
         <option value="brush" selected="selected">Brush</option>
         <option value="line">Line</option>
         <option value="rect">Rectangle</option>
      <option value="circle">Circle</option>
      <option value="triangle">Triangle</option>
      <option value="text">Text</option>
    </select> -->
    <!-- <button @click="clearCanvas">Clear</button> -->
     </div>
`,
     data() {
          return {
               TOUCH_EVS: ['touchstart', 'touchmove', 'touchend'],
               gElCanvas: null,
               gCtx: null,
               gCurrShape: null,
               gCircle: null,
               gShapeSize: null,
               gIsPressing: null,
               gLastDrawn: null,
               gLinePos: null,
               gCanDraw: null,
               currColor: '#FFFFFF',
          }
     },
     methods: {
          onMouseDown(ev) {
               this.gIsPressing = true
               switch (this.gCurrShape) {
                    case 'line':
                         if (!this.gLinePos) break
                         const pos = this.getEvPos(ev)
                         const { startX, startY } = this.gLinePos
                         const { x: endX, y: endY } = pos
                         this.drawLine(startX, startY, endX, endY)
                         this.gLinePos = null
                         break
                    case 'brush':
                         this.gCanDraw = false
                         this.gCtx.beginPath()
                         break
               }
          },
          onMouseUp(ev) {
               this.gIsPressing = false
               switch (this.gCurrShape) {
                    case 'line':
                         if (!this.gLinePos) break
                         const pos = this.getEvPos(ev)
                         const { startX, startY } = this.gLinePos
                         const { x: endX, y: endY } = pos
                         this.drawLine(startX, startY, endX, endY)
                         this.gLinePos = null
                         break
                    case 'brush':
                         this.gCanDraw = false
                         break
               }
          },
          draw(ev) {
               if (!this.gIsPressing || this.gCurrShape === 'line' || this.gCurrShape === 'text') return
               const pos = this.getEvPos(ev)
               const { x, y } = pos
               if (!this.checkCanDraw(x, y)) return
               const { movementX: movX, movementY: movY } = ev
               this.gShapeSize = 2 * (Math.abs(movX / 2) + Math.abs(movY / 2))
               switch (this.gCurrShape) {
                    case 'circle':
                         this.drawCircle(x, y)
                         break
                    case 'triangle':
                         this.drawTriangle(x, y)
                         break
                    case 'rect':
                         this.drawRect(x, y)
                         break
                    case 'brush':
                         this.drawBrush(x, y)
                         break
               }
          },
          checkCanDraw(x, y) {
               const { startX, startY, endX, endY, size } = this.gLastDrawn
               if (x > startX - size / 2 && x < endX + size / 2 && y > startY - size / 2 && y < endY + size / 2) return false
               return true
          },
          getEvPos(ev) {
               // Gets the offset pos , the default pos
               let pos = {
                    x: ev.offsetX,
                    y: ev.offsetY,
               }
               // Check if its a touch ev
               if (this.TOUCH_EVS.includes(ev.type)) {
                    //soo we will not trigger the mouse ev
                    ev.preventDefault()
                    //Gets the first touch point
                    ev = ev.changedTouches[0]
                    //Calc the right pos according to the touch screen
                    pos = {
                         x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
                         y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
                    }
               }
               return pos
          },
          addTouchListeners() {
               this.gElCanvas.addEventListener('touchstart', this.onMouseDown)
               this.gElCanvas.addEventListener('touchmove', this.draw)
               this.gElCanvas.addEventListener('touchend', this.onMouseUp)
          },
          addMouseListeners() {
               this.gElCanvas.addEventListener('mousedown', this.onMouseDown)
               this.gElCanvas.addEventListener('mousemove', this.draw)
               this.gElCanvas.addEventListener('mouseup', this.onMouseUp)
          },
          addListeners() {
               this.addMouseListeners()
               this.addTouchListeners()
          },
          init() {
               this.gElCanvas = document.querySelector('#my-canvas')
               this.gCtx = this.gElCanvas.getContext('2d')
               this.resetGlobals()
               this.addListeners()
               this.gCtx.fillStyle = 'white'
               this.$refs.canvasContainer.focus()
          },
          resetGlobals() {
               this.gShapeSize = 10
               this.gCurrShape = 'brush'
               this.gCanDraw = false
               this.gIsPressing = false
               this.gLastDrawn = { startX: 0, startY: 0, endX: 0, endY: 0 }
          },
          drawCircle(x, y) {
               this.gCtx.beginPath()
               this.gCtx.arc(x, y, this.gShapeSize, 0, 2 * Math.PI)
               this.gCtx.stroke()
               this.gCtx.fill()
               this.gLastDrawn = { startX: x, startY: y, endX: x + this.gShapeSize, endY: y + this.gShapeSize, size: this.gShapeSize * Math.PI }
          },
          drawBrush(x, y) {
               this.gCtx.lineTo(x, y)
               this.gCtx.stroke()
          },
          drawLine(startX, startY, endX, endY) {
               this.gCtx.lineJoin = 'miter'
               this.gCtx.lineCap = 'square'
               this.gCtx.moveTo(startX, startY)
               this.gCtx.lineTo(endX, endY)
               //debugger
               this.gCtx.lineWidth = 2
               this.gCtx.stroke()
          },
          drawTriangle(x, y) {
               this.gCtx.beginPath()
               this.gCtx.moveTo(x - (this.gShapeSize / 2), y - (this.gShapeSize / 2))
               this.gCtx.lineTo(10 + x, this.gShapeSize + y)
               this.gCtx.lineTo(20 + x, this.gShapeSize / 2 + y)
               this.gCtx.closePath()
               this.gCtx.stroke()
               this.gCtx.fill()
               this.gLastDrawn = { startX: x, startY: y, endX: x + this.gShapeSize, endY: y + this.gShapeSize, size: this.gShapeSize }
          },
          drawRect(x, y) {
               this.gCtx.strokeRect(x - (this.gShapeSize / 2), y - (this.gShapeSize / 2), this.gShapeSize, this.gShapeSize)
               this.gCtx.fillRect(x - (this.gShapeSize / 2), y - (this.gShapeSize / 2), this.gShapeSize, this.gShapeSize)
               this.gLastDrawn = { startX: x, startY: y, endX: x + this.gShapeSize, endY: y + this.gShapeSize, size: this.gShapeSize }
          },
          drawText(text, x, y) {
               this.gCtx.lineWidth = 2
               this.gCtx.font = `${this.gShapeSize * 10}px Arial`
               this.gCtx.textAlign = 'center'
               this.gCtx.textBaseline = 'middle'
               this.gCtx.fillText(text, x - (this.gShapeSize / 2), y - (this.gShapeSize / 2)) // Draws (fills) a given text at the given (x, y) position.
               this.gCtx.strokeText(text, x - (this.gShapeSize / 2), y - (this.gShapeSize / 2)) // Draws (strokes) a given text at the given (x, y) position.
               this.gIsPressing = false
          },
          clearCanvas() {
               this.gCtx.clearRect(0, 0, this.gElCanvas.width, this.gElCanvas.height)
          },
          saveCanvas() {
               const data = this.gElCanvas.toDataURL() // Method returns a data URL containing a representation of the image in the format specified by the type parameter.
               // elLink.href = data // Put it on the link
               // elLink.download = 'my-img' // Can change the name of the file
               this.$emit('saveCanvas', data)
          },
     },
     computed: {

     },
     mounted() {
          this.init()
     },
     components: {

     },
}