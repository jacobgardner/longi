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

        for (const i of range(6)) {
            this.addRow(i);
        }
    }

    clear() {
        throw new Error('Not yet implemented');
    }

    async reveal(reveals: boolean[]) {}

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

    async attempt(word: string) {
        if (this.filled >= 5) {
            this.addRow(this.filled);
        }

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

        for (let i = 0; i < wordAttempt.length; i += 1) {
            const element = document.getElementById(
                `entry-${this.filled}-${i}`
            ) as HTMLDivElement;

            const letterElement = document.createElement('div');
            letterElement.className = 'letter';
            letterElement.innerText = wordAttempt[i];

            element.appendChild(letterElement);

            const letter = wordAttempt[i];
            // output += `%c${wordAttempt[i]}`;
            if (letter === originalWord[i]) {
                element.classList.add('letter-correctPosition');
                await this.playSound('correct');
                frequency[letter] -= 1;
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

            // console.log(originalFrequency);
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
            .map(j => `<div class="col" id="entry-${rowNumber}-${j}"></div>`)
            .join('')}</div>`;
        const row = fragment.children[0];

        this.board.appendChild(row);
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
