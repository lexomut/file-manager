import { open } from 'fs/promises';
import { normalizePath } from './normalize-path.js';
import path from 'path';

export async function cat(pathToFile, currentPath) {
    pathToFile = normalizePath(pathToFile, currentPath);
    const file = await open(pathToFile);
    const readStream = file.createReadStream();

    await new Promise(((resolve, reject) => {
        try {
            readStream.on('error', reject);
            readStream.on('close', () => {
                console.log('');
                resolve();
            });

            readStream.pipe(process.stdout);

        } catch (e) {
            throw e;
        }
    }));

}
