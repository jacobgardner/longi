
const container = document.querySelector('.js-container') as HTMLDivElement;

abstract class MessageSender {

}

class WindowMessageSender extends MessageSender {
    constructor (private window: Window) {
        super();
    }

    send(data: any) {
        this.window.postMessage(data, '*');
    }
}

class PresenterMenu {

    element: HTMLDivElement;

    constructor() {
        const fragment = document.createElement('div');
        fragment.innerHTML = this.generate();
        this.element = fragment.children[0] as HTMLDivElement;
        const secondScreen: HTMLButtonElement = this.element.querySelector('.js-secondScreen') as HTMLButtonElement;

        secondScreen.addEventListener('click', () => {
            const ref = window.open('audience.html') as Window;
            const sender = new WindowMessageSender(ref);
            ref.addEventListener('load', () => {
                sender.send('Poop');
            })


        });
    }

    generate() {
        return `
            <div class="menu">
                <button class="btn btn-menu js-singlePlayer" title="Not yet implemented" disabled>Single Player</button>
                <button class="btn btn-menu js-secondScreen">Present on Second Screen</button>
                <button class="btn btn-menu js-cast" is="google-cast-button">Present Via Chromecast</button>
            </div>
        `
    }

    attach(container: HTMLElement) {
        container.appendChild(this.element);
    }
}

const menu = new PresenterMenu();
menu.attach(container);

console.log('Cast Framework Version:', cast.framework.VERSION);
const APP_ID = 'CD0EE29F';
cast.framework.setLoggerLevel(cast.framework.LoggerLevel.DEBUG);

cast.framework.CastContext.getInstance().setOptions({
    receiverApplicationId: APP_ID,
    autoJoinPolicy: chrome.cast.AutoJoinPolicy.PAGE_SCOPED
});

const remote = new cast.framework.RemotePlayer();
console.log(remote);
