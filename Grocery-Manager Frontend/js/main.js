const publicVapidKey = 'YOUR_PUBLIC_VAPID_KEY'; // Replace with your public VAPID key

// Register the service worker and subscribe the user to push notifications
async function subscribeUser() {
    if ('serviceWorker' in navigator) {
        try {
            const register = await navigator.serviceWorker.register('/service-worker.js', {
                scope: '/'
            });

            const subscription = await register.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
            });

            await sendSubscriptionToServer(subscription);
            console.log('User is subscribed:', subscription);
        } catch (error) {
            console.error('Failed to subscribe the user: ', error);
        }
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

async function sendSubscriptionToServer(subscription) {
    const response = await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to send subscription to server');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('subscribeButton').addEventListener('click', subscribeUser);
});
