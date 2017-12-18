import MessageProtocol from './protocol';
import { APPLICATION_ID, MESSAGE_NAMESPACE, NON_CAST_DESIGNATION } from './config';
const container = document.querySelector('.js-container') as HTMLDivElement;

abstract class MessageSender {
    abstract send(data: MessageProtocol): void;
}

class WindowMessageSender extends MessageSender {
    constructor(private window: Window) {
        super();
    }

    send(data: MessageProtocol) {
        this.window.postMessage(data, '*');
    }
}

class CastMessageSender extends MessageSender {
    constructor(private session: cast.framework.CastSession) {
        super();
    }

    send(data: MessageProtocol) {
        this.session.sendMessage(MESSAGE_NAMESPACE, data);
    }
}

class PresenterMenu {
    element: HTMLDivElement;

    constructor() {
        const fragment = document.createElement('div');
        fragment.innerHTML = this.generate();
        this.element = fragment.children[0] as HTMLDivElement;
        const secondScreen: HTMLButtonElement = this.element.querySelector(
            '.js-secondScreen'
        ) as HTMLButtonElement;

        secondScreen.addEventListener('click', () => {
            const ref = window.open(`audience.html#${NON_CAST_DESIGNATION}`) as Window;
            const sender = new WindowMessageSender(ref);
            ref.addEventListener('load', () => {
                console.log('sending');
                sender.send({poop: 'Poop'});
            });
        });
    }

    generate() {
        return `
            <div class="menu">
                <button class="btn btn-menu js-singlePlayer" title="Not yet implemented" disabled>Single Player</button>
                <button class="btn btn-menu js-secondScreen">Present on Second Screen</button>
                <button class="btn btn-menu js-cast" is="google-cast-button">Present Via Chromecast</button>
            </div>
        `;
    }

    attach(container: HTMLElement) {
        container.appendChild(this.element);
    }
}

const menu = new PresenterMenu();
menu.attach(container);

window.castInitialized = function() {
    console.log('Cast Framework Version:', cast.framework.VERSION);
    cast.framework.setLoggerLevel(cast.framework.LoggerLevel.DEBUG);

    const context = cast.framework.CastContext.getInstance();
    context.setOptions({
        receiverApplicationId: APPLICATION_ID,
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.PAGE_SCOPED,
    });

    context.addEventListener(
        cast.framework.CastContextEventType.CAST_STATE_CHANGED,
        (evt: cast.framework.CastStateEventData) => {
            console.log('Event:', evt, cast.framework.CastState.CONNECTED);
            if (evt.castState === cast.framework.CastState.CONNECTED) {
                const session = context.getCurrentSession();
                console.log(session);
                session.sendMessage(MESSAGE_NAMESPACE, { poop: 'POOOPSIES' });
            }
        }
    );

    const remote = new cast.framework.RemotePlayer();
    console.log(remote);
};
