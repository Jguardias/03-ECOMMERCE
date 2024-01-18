// Import the Multer library to manage file uploads
import multer from "multer";
// Configuring Multer with a specific destination (dest) to store the uploaded files
const upload = multer({dest:"./src/uploads/"});
// Export file upload settings 
export default upload;