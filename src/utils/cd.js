import path from 'path';
import fs from 'fs';

export function cd(arg,currentPath) {
    return new Promise((resolve, reject) => {
        try {
            let dirPath;
            if (path.isAbsolute(arg)) {
                console.log('аблолютный');
                dirPath = path.normalize(arg);
            } else {
                console.log('неаблолютный');
                dirPath = path.join(currentPath, path.normalize(arg));;
            }
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
