import { unlink } from 'fs/promises';
import { normalizePath } from './normalize-path.js';

export async function remove(pathToFile, currentPath) {
    try {
        pathToFile = normalizePath(pathToFile, currentPath);
        return unlink(pathToFile);
    } catch (e) {
        throw e;
    }
}
