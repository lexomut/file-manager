import { open } from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { normalizePath } from './normalize-path.js';

export async function copy(pathToFile, pathToNewDirectory, currentPath) {
    try {
        pathToFile = normalizePath(pathToFile, currentPath);
        const fileName = path.parse(pathToFile).name + (path.parse(pathToFile).ext||'');
        pathToNewDirectory = normalizePath(pathToNewDirectory + '/' + fileName, currentPath);
        const file = await open(pathToFile);
        const input = file.createReadStream();
        const output = fs.createWriteStream(pathToNewDirectory);
        return await new Promise((resolve, reject) => {
            input.on('error', reject);
            output.on('error', reject);
            output.on('finish', resolve);
            input.pipe(output);
        });
    } catch (e) {
        throw e;
    }
}

