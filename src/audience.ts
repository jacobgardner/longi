import { MESSAGE_NAMESPACE, NON_CAST_DESIGNATION } from './config';
import MessageProtocol from './protocol';
import './game';

console.log('Starting....');

function handleMessage(data: MessageProtocol) {
    console.log('message', data.poop);
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
