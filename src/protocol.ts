import { MESSAGE_NAMESPACE } from './config';

export interface SetWord {
    word: string;
    reveals: boolean[];
}

export interface AttemptWord {
    word: string;
    reveals: boolean[];
}

export default interface MessageProtocol {
    messageType: MessageType;
    payload: SetWord | AttemptWord;
};

export enum MessageType {
    // RESET,
    SET_WORD,
    ATTEMPT,
}

export abstract class MessageSender {
    abstract send(data: MessageProtocol): void;
}

export class WindowMessageSender extends MessageSender {
    constructor(private window: Window) {
        super();
    }

    send(data: MessageProtocol) {
        this.window.postMessage(data, '*');
    }
}

export class CastMessageSender extends MessageSender {
    constructor(private session: cast.framework.CastSession) {
        super();
    }

    send(data: MessageProtocol) {
        this.session.sendMessage(MESSAGE_NAMESPACE, data);
    }
}
