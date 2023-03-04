export default {
     props: [],
     template: `
          <!-- <input type="file" id="recorder" accept="audio/*" capture @change="start($event)"/> -->
          <audio id="player" ref="player" controls @dataavailable="save" @stop="stop"></audio>
          <a ref="downloadLink" id="download">Download</a>
          <button id="stop">Stop</button>
`,
     data() {
          return {
               ediaRecorder: null,
               chunks: [],
               audioURL: '',
               State: ['Initial', 'Record', 'Download']
          }
     },
     methods: {
          stopRecording() {
               stateIndex = 2
               mediaRecorder.stop()
               application(stateIndex)
          },
          record() {
               stateIndex = 1
               mediaRecorder.start()
               application(stateIndex)
          },
     },
     computed: {
          toggle() {
               if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    navigator.mediaDevices.getUserMedia({
                         audio: true
                    }).then(stream => {
                         mediaRecorder = new MediaRecorder(stream)

                         mediaRecorder.ondataavailable = (e) => {
                              chunks.push(e.data)
                         }

                         mediaRecorder.onstop = () => {
                              const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' })
                              chunks = []
                              audioURL = window.URL.createObjectURL(blob)
                              document.querySelector('audio').src = audioURL

                         }
                    }).catch(error => {
                         console.log('Following error has occured : ', error)
                    })
               } else {
                    stateIndex = ''
                    application(stateIndex)
               }
          },
     },
     mounted() {
     },
     components: {

     },
}