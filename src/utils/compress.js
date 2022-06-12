import { open } from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { normalizePath } from './normalize-path.js';
import zlib from 'zlib';

export async function compress(pathToFile, newPath, currentPath) {
    try {
        pathToFile = normalizePath(pathToFile, currentPath);
        const fileName = path.parse(pathToFile).name;
        newPath = normalizePath(newPath||'./' + fileName+(path.parse(pathToFile).ext||'')+'.br', currentPath);
        const file = await open(pathToFile);
        const input = file.createReadStream();
        const gzip = zlib.createBrotliCompress();
        const output = fs.createWriteStream(newPath);
        return await new Promise((resolve, reject) => {
            input.on('error', reject);
            output.on('error', reject);
            output.on('finish', resolve);
            input.pipe(gzip).pipe(output);
        });

    } catch (e) {
        console.log('добавь в путь назначения  название файла');
        throw e;
    }
}

export async function decompress(pathToFile, newPath, currentPath) {
    try {
        pathToFile = normalizePath(pathToFile, currentPath);
        const fileName = path.parse(pathToFile).name;
        newPath = normalizePath(newPath ||'./' + fileName, currentPath);
        const file =  open(pathToFile);
        const input =  file.createReadStream();
        const gzip =  zlib.createBrotliDecompress();
        const output =  fs.createWriteStream(newPath);
        return await new Promise((resolve, reject) => {
            input.on('error', reject);
            output.on('error', reject);
            output.on('finish', resolve);
            input.pipe(gzip).pipe(output);
        });

    } catch (e) {
        console.log('давай в путь назначения  название файла');
        throw e;
    }
}

