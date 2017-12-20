
export class PresenterMenu {
    private element: HTMLDivElement;

    constructor() {
        const fragment = document.createElement('div');
        fragment.innerHTML = this.generate();
        this.element = fragment.children[0] as HTMLDivElement;


    }

    generate() {
        return `<div class="presenter">
            <div class="teams">
                <div class="team">
                    <input class="team-name" type="text" name="teamA" placeholder="teamA">
                    <input class="team-score" type="number" name="teamA-score" value="0">
                </div>
                <div class="header">
                LONG I
                </div>
                <div class="team">
                    <input class="team-name" type="text" name="teamB" placeholder="teamB">
                    <input class="team-score" type="number" name="teamB-score" value="0">
                </div>
            </div>
            <div class="controller">

                <div class="input">
                </div>
                <div class="words">

                    <div class="label">Words</div>

                    <div class="words-list-container">
                        <textarea class="words-list"></textarea>
                    </div>
                    <div class="words-source">
                        Custom <input type="radio" value="custom" name="wordsSource" checked>
                        Full Dictionary <input type="radio" value="dictionary" name="wordsSource">
                    </div>
                </div>
            </div>
        </div>`;
    }

    attach(container: HTMLElement) {
        container.appendChild(this.element);
    }
}
