export function randInt(max: number): number;
export function randInt(min: number, max: number): number;
export function randInt(min: number, max?: number) {
    if (max === undefined) {
        max = min;
        min = 0;
    }

    return Math.floor(Math.random() * (max - min)) + min;
}

export enum Reason {
    NOT_A_WORD,
    INVALID_SIZE,
}

export class InvalidWord {
    constructor(public reason: Reason) {}
}


async function wordInDictionary(word: string): Promise<boolean> {
    console.error('Dictionary Lookup Not Yet Implemented')
    return true;
}

export async function isValidWord(word: string): Promise<InvalidWord | boolean> {
    if (word.length !== 5) {
        return new InvalidWord(Reason.INVALID_SIZE);
    }

    if (!await wordInDictionary(word)) {
        return new InvalidWord(Reason.NOT_A_WORD);
    }

    return true;
}
