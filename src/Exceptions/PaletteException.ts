import TailwindcssOpinionatedPresetException from './TailwindcssOpinionatedPresetException.js';

export default class PaletteException extends TailwindcssOpinionatedPresetException {
    static couldNotGenerateAPalette(value: string): PaletteException {
        return this.thow(`Could not generate any colors from the provided value: \`${value}\`.`);
    }
}
