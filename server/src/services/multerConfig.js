// Import the Multer library to manage file uploads
import multer from "multer";
const storage = multer.diskStorage(
    {
        destination: "./src/uploads/",
        filename: function (req, file, cb) {
            const fileExtension = file.originalname.split(".").pop();
            const newFileName = file.fieldname + '-' + Date.now()+ "." + fileExtension;
            cb(null, newFileName);
        }
    }
);
// Configuring Multer with a specific destination (dest) to store the uploaded files
const upload = multer({storage: storage});
// Export file upload settings 
export default upload;