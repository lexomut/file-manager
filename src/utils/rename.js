import path from 'path';
import fsPromises from 'fs/promises';
import { normalizePath } from './normalize-path.js';

export async function rename(pathToFile, newName, currentPath) {
    try {
        pathToFile = normalizePath(pathToFile, currentPath);
        await fsPromises.rename(pathToFile, path.join(currentPath, newName));
    } catch (e) {
        throw e;
    }
}
