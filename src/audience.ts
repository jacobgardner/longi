import Board from './longiBoard';
import { MESSAGE_NAMESPACE, NON_CAST_DESIGNATION } from './config';
import MessageProtocol, { MessageType, SetWord, AttemptWord } from './protocol';
import { AttemptResponse } from './game';
// import './game';

console.log('Starting....');

const container = document.querySelector('.js-container') as HTMLElement;
const board = new Board();
board.attach(container);

const messageQueue: MessageProtocol[] = [];
let inProgress = false;

const handlers: { [key: number]: Function } = {};

handler(MessageType.SET_WORD, async (data: SetWord) => {
    await board.clear();
    board.word = data.word;
    await board.reveal(data.reveals);
});

handler(MessageType.ATTEMPT, async (data: AttemptWord) => {
    await board.attempt(data.word, data.attemptResponse !== AttemptResponse.INVALID);
    if (data.attemptResponse !== AttemptResponse.MATCH) {
        await board.reveal(data.reveals);
    }
});

function handler(type: MessageType, fn: Function) {
    handlers[type] = fn;

    return fn;
}

async function processMessages() {
    inProgress = true;
    while (messageQueue.length) {
        const message = messageQueue.shift() as MessageProtocol;

        const handler = handlers[message.messageType];

        await handler(message.payload);
    }

    inProgress = false;
}

function handleMessage(data: MessageProtocol) {
    if (data.namespace !== MESSAGE_NAMESPACE) {
        return;
    }

    messageQueue.push(data);
    if (!inProgress) {
        processMessages();
    }
}

if (window.location.hash === `#${NON_CAST_DESIGNATION}`) {
    window.addEventListener('message', dataContainer => {
        console.log('Message from window:', dataContainer);
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
