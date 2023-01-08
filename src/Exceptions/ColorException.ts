import TailwindcssOpinionatedPresetException from './TailwindcssOpinionatedPresetException.js';

export default class ColorException extends TailwindcssOpinionatedPresetException {
    static invalidColor(value: string): ColorException {
        return this.thow(`The provided color \`${value}\` is invalid.`);
    }
    static missingName(value: string): ColorException {
        return this.thow(`The color \`${value}\` was not provided a name, nor could one be determined.`);
    }
    static valueUnsuitableAsRootProperty(value: string): ColorException {
        return this.thow(
            `The provided color entry: \`${value}\` has a value unsuitable to be set as a \`:root {}\` property.`
        );
    }
}
