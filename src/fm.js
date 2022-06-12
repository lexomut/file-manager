import os from 'os';
import path from 'path';
import fs from 'fs';
import { cd } from './utils/cd.js';
import { create } from './utils/create.js';
import { rename } from './utils/rename.js';
import { cat } from './utils/cat.js';
import { copy } from './utils/copy.js';
import { remove } from './utils/remove.js';
import { calculateHash } from './utils/hash.js';
import { compress, decompress} from './utils/compress.js';

const homedir = os.homedir();


class FM {
    constructor() {
        this.path = homedir;
        this.rootDir = path.parse(process.cwd()).root;
    }


    up() {
        console.log(this.path);
        this.path = path.join(this.path, '../');
        console.log(this.path);
    }

    ls() {
        fs.readdir(this.path, (err, filename) => console.log(filename));
    }

    cd(arg) {
        return cd(arg, this.path).then(path => this.path = path);
    }

    add(fileName) {
        return create(path.join(this.path, fileName));
    }

    rn(pathToFile, newFilename) {
        return rename(pathToFile, newFilename, this.path);
    }

    cat(pathToFile) {
        return cat(pathToFile, this.path);
    }

    cp(path_to_file, path_to_new_directory) {
        return copy(path_to_file, path_to_new_directory, this.path);
    }

    mv(path_to_file, path_to_new_directory) {
        return copy(path_to_file, path_to_new_directory, this.path).then(() => this.rm(path_to_file));
    }

    rm(path_to_file) {
        return remove(path_to_file, this.path);
    }

    os(arg) {
        os.architecture = os.arch;
        os.username = os.userInfo().username;
        const key = (arg.startsWith('--') && arg.slice(2)) || arg;
        if (os[key]) {
            if (typeof os[key] === 'function') console.log(os[key]());
            else console.log(JSON.stringify(os[key]));
        } else {
            throw new Error(`OS module has no ${arg} method`);
        }
        return Promise.resolve();
    }

    hash(path_to_file) {
        return calculateHash(path_to_file, this.path);
    }

    compress ( path_to_file, path_to_destination) {
        return compress(path_to_file, path_to_destination, this.path);
    }

    decompress ( path_to_file, path_to_destination) {
        return decompress(path_to_file, path_to_destination, this.path);
    }


}

export const fm = new FM();
