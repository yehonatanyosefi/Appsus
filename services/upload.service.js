import { noteService } from "../apps/keep/services/note.service.js"

export const uploadService = {
    onImgInput,
}

// The next 2 functions handle IMAGE UPLOADING to img tag from file system:
function onImgInput(ev, note) {
    loadImageFromInput(ev, note)
}

// CallBack func will run on success load of the img
function loadImageFromInput(ev, note) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = function (event) {
        let img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        // Run the callBack func, To render the img on the canvas
        img.onload = () => {
            // onImageReady.bind(null, img, note)
            return Promise.resolve(noteService.addImg(img, note))

        }
    }
    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}