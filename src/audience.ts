import './game';

window.addEventListener('message', (dataContainer) => {
    console.log('message', dataContainer.data);
});

// TODO: Add google cast message receiver
