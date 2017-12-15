import { randInt, isValidWord } from './utils';
import { cloneDeep } from 'lodash';

class LongiBoard {
    constructor() {}
}

class Team {
    longiBoard: LongiBoard = new LongiBoard();

    constructor(public players: string[], public score: number = 0) {}
}

export enum AttemptResponse {
    VALID,
    MATCH,
    INVALID,
}

export interface Attempt {
    word: string;
    attemptResponse: AttemptResponse;
}

export enum GameMode {
    REGULAR,
    BINGO,
    BONUS,
}

interface GameState {
    teams: Team[];
    mode: GameMode;
    word: string;
    activeTeam: number;
    attempts: Attempt[];
    reveals: boolean[];
}

// interface GameState {
//     history: Snapshot[];
// }

function generateInitialState(
    teams: string[][],
    initialWord: string
): GameState {
    // if (teams.length !== 2) {
    //     throw new Error('Not yet implemented.');
    // }

    const reveals: boolean[] = Array.prototype.map.call(initialWord, () => false);
    reveals[0] = true;

    return {
        teams: teams.map(players => new Team(players)),
        mode: GameMode.REGULAR,
        word: initialWord,
        reveals,
        activeTeam: randInt(teams.length),
        attempts: [],
    };
}

async function attemptWord(
    prevState: GameState,
    wordAttempt: string
): Promise<GameState> {
    const state = cloneDeep(prevState);

    if (!await isValidWord(wordAttempt)) {
        state.attempts.push({
            word: wordAttempt,
            attemptResponse: AttemptResponse.INVALID,
        });
    } else {
        if (wordAttempt === state.word) {
            state.attempts.push({
                word: wordAttempt,
                attemptResponse: AttemptResponse.MATCH,
            });
        } else {

            const word = state.word.toUpperCase();
            const attempt = wordAttempt.toUpperCase();
            
            for (let i = 0; i < word.length; i += 1) {
                if (word[i] === attempt[i]) {
                    state.reveals[i] = true;
                }
            }

            state.attempts.push({
                word: wordAttempt,
                attemptResponse: AttemptResponse.VALID,
            });
        }
    }

    return state;
}

interface LetterFrequency {
    [key: string]: number;
}

function draw(state: GameState) {
    console.log('-----------------');
    const word = state.word.toUpperCase();

    const originalFrequency: LetterFrequency = {};

    for (let i = 0; i < word.length; i += 1) {
        const letter = word[i];
        if (!originalFrequency[letter]) {
            originalFrequency[letter] = 1;
        } else {
            originalFrequency[letter] += 1;
        }
    }


    for (const attempt of state.attempts) {
        const frequency = cloneDeep(originalFrequency);
        const wordAttempt = attempt.word.toUpperCase();
        if (attempt.attemptResponse === AttemptResponse.INVALID) {
            console.log(`%c${wordAttempt}`, 'color: blue');
        } else {
            let output = '';
            const colors = [];

            for (let i = 0; i < wordAttempt.length; i += 1) {
                const letter = wordAttempt[i];
                output += `%c${wordAttempt[i]}`;
                if (letter === word[i]) {
                    colors.push('green');
                    frequency[letter] -= 1;
                } else {
                    if (frequency[letter]) {
                        colors.push('orange');
                        frequency[letter] -= 1;
                    } else {
                        colors.push('blue');
                    }
                }

                // console.log(originalFrequency);
            }

            console.log(output, ...colors.map(color => `color: ${color};`));
        }
    }

    let output = '%c';
    for (let i = 0; i < word.length; i += 1) {
        if (state.reveals[i]) {
            output += `${word[i]}`;
        } else {
            output += '-';
        }
    }

    console.log(output, 'color: blue;');
    console.log('-----------------');
}

async function test() {
    let state = generateInitialState([['jake']], 'shade');
    draw(state);
    state = await attemptWord(state, 'shoot');
    draw(state);
    state = await attemptWord(state, 'sheds');
    draw(state);
    state = await attemptWord(state, 'shape');
    draw(state);
}

test();
