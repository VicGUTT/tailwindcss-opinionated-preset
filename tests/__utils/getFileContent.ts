import path from 'path';
import fs from 'fs';

export default function getFileContent(filePath: string) {
    return fs.readFileSync(path.resolve(`${__dirname}/../${filePath}`), 'utf8');
}
