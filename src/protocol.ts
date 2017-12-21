import { MESSAGE_NAMESPACE } from './config';
import { AttemptResponse } from './game';

export interface SetWord {
    word: string;
    reveals: boolean[];
}

export interface AttemptWord {
    word: string;
    reveals: boolean[];
    attemptResponse: AttemptResponse;
}

export default interface MessageProtocol {
    namespace?: string;
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
        data.namespace = MESSAGE_NAMESPACE;
        this.window.postMessage(data, '*');
    }
}

export class CastMessageSender extends MessageSender {
    constructor(private session: cast.framework.CastSession) {
        super();
    }

    send(data: MessageProtocol) {
        data.namespace = MESSAGE_NAMESPACE;
        this.session.sendMessage(MESSAGE_NAMESPACE, data);
    }
}
