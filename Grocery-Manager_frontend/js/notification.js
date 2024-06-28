document.getElementById('sendNotficationButton').addEventListener('click', () => {
    fetch('/api/notify?title=New%20Notification&body=You%20have%20a%20new%20notification!', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => console.log('Notification sent successfully:', data))
    .catch((error) => console.error('Error sending notification:', error));
});