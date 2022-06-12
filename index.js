import {fm} from './src/fm.js';
const arg ={};
process.argv.slice(2).forEach(item => {
    if(item.startsWith('--') ) {
        const [key,value]=item.slice(2).split('=');
        arg[key]=value;
    }
});
console.log(`Welcome to the File Manager, ${arg.user||''}!`);
const unknownCommand=() => console.log('Invalid input');

try {
    process.stdin.on('data', async (data) => {
        const message=data.toString().slice(0,-2);
        const [command,arg,arg2]=message.split(' ');
        if (fm[command]) {
            try {
                await fm[command](arg?.toString(),arg2?.toString());
                console.log(`You are currently in ${fm.path}`);
            }
            catch (e)
            {
                console.log('Operation failed');
            }

        } else {
            unknownCommand();
        }
    });
}catch (e) {
    console.log('все');
}



