import fs from 'fs';

function saveImage(file){
    const newPath = `./src/uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return newPath;
}

export default saveImage;