export default class TailwindcssOpinionatedPresetException extends Error {
    protected static msg(message: string): string {
        return `[TailwindCSS Opinionated Preset]: ${message}`;
    }

    protected static thow(message: string): TailwindcssOpinionatedPresetException {
        return new this(this.msg(message));
    }
}
