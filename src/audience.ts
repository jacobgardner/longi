import Board from './longiBoard';
import { MESSAGE_NAMESPACE, NON_CAST_DESIGNATION } from './config';
import MessageProtocol, { MessageType } from './protocol';
// import './game';

console.log('Starting....');

const container = document.querySelector('.js-container') as HTMLElement;
const board = new Board();
board.attach(container);

const messageQueue: MessageProtocol[] = [];
let inProgress = false;

async function processMessages() {
    inProgress = true;
    while (messageQueue.length) {
        const message = messageQueue.shift() as MessageProtocol;
        console.log(message);

        switch (message.messageType) {
            case MessageType.SET_WORD:
                await board.clear();
                board.word = message.payload.word;
                await board.reveal(message.payload.reveals);
                break;
            case MessageType.ATTEMPT:
                await board.attempt(message.payload.word);
                await board.reveal(message.payload.reveals);
                break;
        }
    }

    inProgress = false;
}

function handleMessage(data: MessageProtocol) {
    messageQueue.push(data);
    if (!inProgress) {
        processMessages();
    }
}

if (window.location.hash === `#${NON_CAST_DESIGNATION}`) {
    window.addEventListener('message', dataContainer => {
        handleMessage(dataContainer.data);
    });
} else {
    const castScript = document.createElement('script');
    castScript.src =
        '//www.gstatic.com/cast/sdk/libs/caf_receiver/v3/cast_receiver_framework.js';

    document.body.appendChild(castScript);

    castScript.addEventListener('load', () => {
        const context = cast.framework.CastReceiverContext.getInstance();

        context.addCustomMessageListener(MESSAGE_NAMESPACE, evt => {
            handleMessage(evt.data);
        });

        // TODO: Add google cast message receiver
        context.start({
            customNamespaces: {
                [MESSAGE_NAMESPACE]: cast.framework.system.MessageType.JSON,
            },
        });
    });
}
