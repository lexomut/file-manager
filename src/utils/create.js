import fs from 'fs';

export async function create(path) {
    await fs.createWriteStream(path);
}
