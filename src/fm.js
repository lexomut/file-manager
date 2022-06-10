import os from 'os';
import path from 'path';
import fs from 'fs';
import { cd } from './utils/cd.js';


const homedir =os.homedir();


class FM {
    constructor() {
        this.path=homedir;
        this.rootDir = path.parse(process.cwd()).root;
    }
    up() {
        console.log(this.path);
        this.path=path.join(this.path,'../');
        console.log(this.path);
        // throw new Error('Operation failed');
    }

    ls () {
        fs.readdir(this.path, (err,filename) => console.log(filename));
    }
    async cd (arg) {
        try {
            this.path= await cd(arg,this.path);
        }
        catch (e) {
            throw e;
        }
    }

}

export const fm = new FM();
