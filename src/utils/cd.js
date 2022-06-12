import fs from 'fs';
import { normalizePath } from './normalize-path.js';

export function cd(arg, currentPath) {
    return new Promise((resolve, reject) => {
        try {
            const dirPath = normalizePath(arg, currentPath);
            fs.access(dirPath, (e) => {
                if (e) {
                    reject(e);
                } else {
                    resolve(dirPath);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
}
