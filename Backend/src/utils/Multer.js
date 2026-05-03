import multer from "multer";


const storage = multer.diskStorage({

    destination:"Uploads", // specify the destination directory for uploaded files
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname); // specify the filename for the uploaded file
    }
})

const upload = multer({ storage: storage }); // create a multer instance with the defined storage configuration

export  default upload;