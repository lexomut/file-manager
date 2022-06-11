import path from 'path';

export function normalizePath(pathToFile,currentPath) {
    if (path.isAbsolute(pathToFile)) {
        pathToFile = path.normalize(pathToFile);
    } else {
        pathToFile = path.join(currentPath, path.normalize(pathToFile));;
    }
    return pathToFile;
}
