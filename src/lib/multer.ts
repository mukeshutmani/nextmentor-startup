import multer from 'multer'
import fs from 'fs'


const uploadDir = './uploads'

if(!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir)
}




const storage = multer.diskStorage({
     destination: function(_req, _file, cb) {
        cb(null, uploadDir)
     },

     filename: function(_req, _file, cb) {
        const filename =  _file.originalname
        cb(null, filename)
}})


export const upload = multer({
    storage,
    limits: {
        fileSize: 5*1024*1024, // 5mb
        files: 2
    }
})