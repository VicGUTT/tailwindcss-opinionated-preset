import setFileContent from './setFileContent.js';

export default function setFixtureContent(fileName: string, content: string) {
    return setFileContent(`/__Fixtures/${fileName}`, content);
}
