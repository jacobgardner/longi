import { MessageSender, MessageType } from './protocol';
import { randInt } from './utils';
import { GameState, generateInitialState, attemptWord, AttemptResponse } from './game';

export class PresenterMenu {
    private element: HTMLDivElement;
    private state: GameState;

    constructor(private sender: MessageSender) {
        this.state = generateInitialState();
        const fragment = document.createElement('div');
        fragment.innerHTML = this.generate();
        this.element = fragment.children[0] as HTMLDivElement;

        const wordList = this.element.querySelector(
            '.words-list'
        ) as HTMLTextAreaElement;
        const playerWord = this.element.querySelector(
            '.js-playerWord'
        ) as HTMLInputElement;

        playerWord.addEventListener('keydown', async (evt) => {
            if (evt.keyCode === 13) {
                // ENTER
                const word = playerWord.value;

                this.state = await attemptWord(this.state, word);

                const lastAttempt = this.state.attempts[this.state.attempts.length - 1];
                if (lastAttempt.attemptResponse === AttemptResponse.INVALID) {

                }

                sender.send({
                    messageType: MessageType.ATTEMPT,
                    payload: {
                        word,
                        reveals: this.state.reveals,
                        attemptResponse: lastAttempt.attemptResponse
                    },
                });

                playerWord.value = '';
            } else if (evt.keyCode === 32) {
                // SPACE
                evt.preventDefault();
            }
        });

        const nextWord = this.element.querySelector(
            '.js-next'
        ) as HTMLButtonElement;
        nextWord.addEventListener('click', () => {
            let word;
            if (this.wordSource === 'custom') {
                const words = wordList.value
                    .split('\n')
                    .map(word => word.trim());
                word = words.splice(randInt(words.length), 1)[0];

                wordList.value = words.join('\n');

                if (!word) {
                    console.error(`Out of words, you've used them all`);
                }
            } else {
                console.error('Not yet implemented');
                return;
            }

            this.state.word = word;
            this.state.reveals = word.split('').map((letter, idx) => idx === 0 ? true : false)

            sender.send({
                messageType: MessageType.SET_WORD,
                payload: {
                    word,
                    reveals: word
                        .split('')
                        .map((letter, idx) => (idx === 0 ? true : false)),
                },
            });
        });
    }

    get wordSource() {
        return (this.element.querySelector(
            '[name="wordsSource"]:checked'
        ) as HTMLInputElement).value;
    }

    generate() {
        return `<div class="presenter">
            <div class="teams">
                <div class="team">
                    <input class="team-turn" type="radio" name="team-turn" value="teamA">
                    <input class="team-name" type="text" name="teamA" placeholder="teamA">
                    <input class="team-score" type="number" name="teamA-score" value="0">
                </div>
                <div class="header">
                LONG I
                </div>
                <div class="team">
                    <input class="team-turn" type="radio" name="team-turn" value="teamB">
                    <input class="team-name" type="text" name="teamB" placeholder="teamB">
                    <input class="team-score" type="number" name="teamB-score" value="0">
                </div>
            </div>
            <div class="controller">

                <div class="input">
                    <button class="btn btn-primary js-next" >Next Word</button>
                    <input class="playerWord js-playerWord" name="playerWord" placeholder="Word">
                </div>
                <div class="words">

                    <div class="label">Words</div>

                    <div class="words-list-container">
                        <textarea class="words-list"></textarea>
                    </div>
                    <div class="words-source">
                        Custom <input type="radio" value="custom" name="wordsSource" checked>
                        Full Dictionary <input type="radio" value="dictionary" name="wordsSource" disabled>
                    </div>
                </div>
            </div>
        </div>`;
    }

    attach(container: HTMLElement) {
        container.appendChild(this.element);
    }
}
