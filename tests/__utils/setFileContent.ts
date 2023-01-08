import path from 'path';
import fs from 'fs';

export default function setFileContent(filePath: string, content: string) {
    return fs.writeFileSync(path.resolve(`${__dirname}/../${filePath}`), content, 'utf8');
}
