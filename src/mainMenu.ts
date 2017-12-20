import {
    APPLICATION_ID,
    MESSAGE_NAMESPACE,
    NON_CAST_DESIGNATION,
} from './config';
import { MessageSender, WindowMessageSender, CastMessageSender } from './protocol';

export default class MainMenu {
    element: HTMLDivElement;

    constructor(public callback: (sender: MessageSender) => void) {
        const fragment = document.createElement('div');
        fragment.innerHTML = this.generate();
        this.element = fragment.children[0] as HTMLDivElement;
        const secondScreen = this.element.querySelector(
            '.js-secondScreen'
        ) as HTMLButtonElement;

        secondScreen.addEventListener('click', () => {
            console.log('Opening...');
            const ref = window.open(
                `audience.html#${NON_CAST_DESIGNATION}`
            ) as Window;
            const sender = new WindowMessageSender(ref);
            ref.addEventListener('load', () => {
                callback(sender);
            });
        });

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
                    console.log(
                        'Event:',
                        evt,
                        cast.framework.CastState.CONNECTED
                    );
                    if (evt.castState === cast.framework.CastState.CONNECTED) {
                        const session = context.getCurrentSession();
                        console.log(session);
                        const sender = new CastMessageSender(session);
                        callback(sender);
                    }
                }
            );

            // const remote = new cast.framework.RemotePlayer();
            // console.log(remote);
        };
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

    show() {
        delete this.element.style.display;
    }

    hide() {
        this.element.style.display = 'none';
    }

    attach(container: HTMLElement) {
        container.appendChild(this.element);
        this.show();
    }
}

// const menu = new MainMenu();
// menu.attach(container);
