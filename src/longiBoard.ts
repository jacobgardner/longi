import { wait } from './utils';
import * as anime from 'animejs';

function* range(max: number): IterableIterator<number> {
    for (let i = 0; i < max; i += 1) {
        yield i;
    }
}

interface LetterFrequency {
    [key: string]: number;
}

export default class Board {
    private board: HTMLDivElement;
    public word: string;
    // public revealed: [true, false, false, false, false];
    private filled = 0;

    constructor() {
        const stuff = this.generate();
        const fragment = document.createElement('div');
        fragment.innerHTML = stuff;
        this.board = fragment.children[0] as HTMLDivElement;

        for (const i of range(5)) {
            this.addRow(i);
        }

        // TODO: This will break scroll animation...
        window.addEventListener('resize', () => {
            this.board.scrollTop =
                this.board.scrollHeight - this.board.clientHeight;
        });
    }

    async clear() {
        for (let i = 5; i < this.filled; i += 1) {
            const element = document.getElementById(`row-${i}`);
            if (element) {
                element.remove();
            }
        }

        for (const entry of this.board.querySelectorAll('.entry')) {
            entry.className = 'entry';
            entry.innerHTML = '';
        }

        this.filled = 0;
    }

    async reveal(reveals: boolean[]) {
        let last;

        if (this.filled >= 5) {
            await this.addRow(this.filled);
        }

        for (let i = 0; i < this.word.length; i += 1) {
            const element = document.getElementById(
                `entry-${this.filled}-${i}`
            ) as HTMLDivElement;

            const letterElement = document.createElement('div');

            letterElement.className = 'letter';

            if (reveals[i]) {
                letterElement.innerText = this.word[i].toUpperCase();
            } else {
                letterElement.innerText = '.';
            }

            element.appendChild(letterElement);

            last = anime({
                targets: letterElement,
                opacity: [0, 1],
                duration: 800,
                easing: 'linear',
            }).finished;

            await wait(200);
        }

        await last;
    }

    playSound(soundName: string) {
        // if (soundName === 'wrongLetter') {
        //     return new Promise(resolve => {
        //         console.log('queuing...');
        //         const audio = document.createElement('audio');
        //         document.body.appendChild(audio);

        //         // const source = document.createElement('source');

        //         audio.src = `sounds/wrong-letter-short.mp3`;
        //         audio.crossOrigin = 'anonymous';

        //         audio.play();
        //         audio.addEventListener('ended', () => {
        //             setTimeout(() => {
        //                 audio.pause();
        //                 audio.src = '';
        //                 audio.remove();
        //                 resolve();
        //             }, 500);
        //             // resolve();
        //         });
        //     });
        // }

        return new Promise(resolve => {
            setTimeout(resolve, 200);
        });
    }

    async attempt(word: string, valid: boolean) {
        const originalWord = this.word.toUpperCase();

        const frequency: LetterFrequency = {};

        for (let i = 0; i < originalWord.length; i += 1) {
            const letter = originalWord[i];
            if (!frequency[letter]) {
                frequency[letter] = 1;
            } else {
                frequency[letter] += 1;
            }
        }

        const wordAttempt = word.toUpperCase();
        // if (attempt.attemptResponse === AttemptResponse.INVALID) {
        //     console.log(`%c${wordAttempt}`, 'color: blue');
        // } else {
        let output = '';
        const colors = [];

        if (valid) {
            wordAttempt.split('').forEach((letter, idx) => {
                console.log(letter, idx, frequency, originalWord[idx]);
                if (originalWord[idx] === letter) {
                    frequency[letter] -= 1;
                }
            });
        }
        console.log(JSON.stringify(frequency));

        for (let i = 0; i < wordAttempt.length; i += 1) {
            const element = document.getElementById(
                `entry-${this.filled}-${i}`
            ) as HTMLDivElement;

            const letter = wordAttempt[i].toUpperCase();
            // const letterElement = document.createElement('div');
            const letterElement = element.querySelector(
                `.letter`
            ) as HTMLDivElement;
            letterElement.className = 'letter';
            letterElement.innerText = letter;

            if (valid) {
                if (letter === originalWord[i]) {
                    element.classList.add('letter-correctPosition');
                    await this.playSound('correct');
                    // frequency[letter] -= 1;
                } else {
                    if (frequency[letter]) {
                        element.classList.add('letter-wrongPosition');
                        await this.playSound('wrongPosition');
                        // colors.push('orange');
                        frequency[letter] -= 1;
                    } else {
                        colors.push('blue');
                        await this.playSound('wrongLetter');
                    }
                }
            }
        }

        // console.log(output, ...colors.map(color => `color: ${color};`));
        // }

        // for (let i = 0; i < originalWord.length; i += 1) {
        //     console.log(this.filled, i);
        //     const element = document.getElementById(`entry-${this.filled}-${i}`) as HTMLDivElement;
        //     element.classList.add('letter-correctPosition');
        //     const letter = document.createElement('div');
        //     letter.className = 'letter';
        //     letter.innerText = originalWord[i];
        //     console.log(letter.classList);
        //     // letter.classList.add('letter-wrongPosition')

        //     element.appendChild(letter);
        // }

        this.filled += 1;


    }

    addRow(rowNumber: number) {
        const fragment = document.createElement('div');
        fragment.innerHTML = `<div class="row" id="row-${rowNumber}">${Array.from(
            range(5)
        )
            .map(j => `<div class="entry" id="entry-${rowNumber}-${j}"></div>`)
            .join('')}</div>`;
        const row = fragment.children[0];

        this.board.appendChild(row);

        return anime({
            targets: this.board,
            scrollTop: this.board.scrollHeight - this.board.clientHeight,
            easing: 'linear',
            duration: 600,
        }).finished;
    }

    private generate() {
        return `
        <div class="board"></div>
        `;
    }

    attach(element: HTMLElement) {
        element.appendChild(this.board);
    }
}
