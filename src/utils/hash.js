import { open } from 'fs/promises';
import { normalizePath } from './normalize-path.js';
import { createHash } from 'crypto';


export const calculateHash = async (filePath, currentPath) => {
    try {
        filePath = normalizePath(filePath, currentPath);
        const hash = createHash('sha256');
        const readFile = await open(filePath);
        const readStream = readFile.createReadStream();
        readStream.pipe(hash).setEncoding('hex').pipe(process.stdout);
        readStream.on('close', console.log);

    } catch (error) {
        throw error;
    }
};
