import setFileContent from './setFileContent.js';

export default function setSnapshotContent(fileName: string, content: string) {
    return setFileContent(`/__Snapshots/${fileName}`, content);
}
