const express = require("express")
const multer = require('multer')
const cors = require('cors');


const app = express()
app.use(cors());

// create a disk storage engine to give you control of storing files to disk
const fileStorageEngine = multer.diskStorage({
  // used to determine where to save your files
    destination: (req, file, cb) => {
     // from this current dir go to files
      cb(null, './files')
    },
    // determines what file name you want
    filename: (req, file, cb) => {
      cb(null, Date.now() + '--' + file.originalname)
    }
})

const upload = multer({storage: fileStorageEngine})

// upload single file to multer
// middleware input should match what send in request (file in this case)
// upload.single('file') is multer middleware (file stored in req.file)
app.post('/single', upload.single('file'), (req, res) => {
    // see details on file being sent
    console.log(req.file)
    res.send("Single file upload success")
})

app.listen(4000, () => {
  console.log("Server has started on port 4000")
})