import getFileContent from './getFileContent.js';

export default function getFixtureContent(fileName: string) {
    return getFileContent(`/__Fixtures/${fileName}`);
}
