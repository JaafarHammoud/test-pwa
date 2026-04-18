let deferredPrompt;
const installBanner = document.getElementById('install-banner');
const installBtn = document.getElementById('install-btn');

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed:', err));
    });
}

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    setTimeout(() => {
        if (!localStorage.getItem('installDismissed')) {
            installBanner.classList.remove('hidden');
        }
    }, 3000);
});

installBtn?.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
        installBanner.classList.add('hidden');
    }
    deferredPrompt = null;
});

function dismissInstall() {
    installBanner.classList.add('hidden');
    localStorage.setItem('installDismissed', 'true');
}

if (window.matchMedia('(display-mode: standalone)').matches) {
    document.body.classList.add('standalone');
}