// Import the Node.js 'fs' (File System) module to handle file system operations
import fs from 'fs';

function renameImage (file){
    // Construct the new file path using the original file name
    const newPath = `./src/uploads/${file.originalname}`;
    // Rename the file from the temporary path to the new path
     fs.renameSync(file.path, newPath);
    // Return the new file path
    return newPath;
}
// Export the 'renameImage' function
export default renameImage;