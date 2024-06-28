document.getElementById('sendNotficationButton').addEventListener('click', function() {
    const storeName = document.getElementById('storeName').value;
    if (!storeName) {
        alert('Please enter a store name.');
        return;
    }
    //fill
    const url = 'http://localhost:8080/api/sendNotification';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            storeName: storeName
        }),
    })
    .then(response => {
        if (!response.ok) {
            alert('Failed to send notification');
            throw new Error('Failed to send notification');
        }
        return response.json();
    })
    .then(data => {
        console.log('Notification sent successfully:', data);
        alert('Notification sent successfully');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});