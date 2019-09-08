if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
    .then(function () {
        console.log('service worker registrado');
    })
    .catch(function () {
        console.warn('service worker falhou');
    });
}
console.log('Running');