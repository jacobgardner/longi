import MessageProtocol, { MessageType } from './protocol';
import MainMenu from './mainMenu';
import { MessageSender } from './protocol';
import { PresenterMenu } from './presenter';

const container = document.querySelector('.js-container') as HTMLDivElement;

const menu = new MainMenu(present);
menu.attach(container);

    menu.hide();
    const presenter = new PresenterMenu();
    presenter.attach(container);


function present(sender: MessageSender) {
    console.log('Presenting...');
    menu.hide();

    const presenter = new PresenterMenu();
    presenter.attach(container);


    sender.send({
        messageType: MessageType.SET_WORD,
        payload: {
            word: 'shade',
            reveals: [true, false, false, false, false],
        },
    });

    sender.send({
        messageType: MessageType.ATTEMPT,
        payload: {
            word: 'shape',
            reveals: [true, true, true, false, true],
        },
    });
}
