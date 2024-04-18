// Import the Node.js 'fs' (File System) module to handle file system operations
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


export function deletefile(pathNameFile){

    const baseNameFile = path.basename(pathNameFile);
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = path.join(__dirname,'..' ,'uploads',`${baseNameFile}`);
    // Verificar si el archivo existe antes de intentar eliminarlo
    if (fs.existsSync(filePath)) {
    // Eliminar el archivo
    fs.unlinkSync(filePath);
    } else {
    console.log('El archivo no existe.');
    }
}
