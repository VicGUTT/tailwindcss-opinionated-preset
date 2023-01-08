import getFileContent from './getFileContent.js';

export default function getSnapshotContent(fileName: string) {
    return getFileContent(`/__Snapshots/${fileName}`);
}
