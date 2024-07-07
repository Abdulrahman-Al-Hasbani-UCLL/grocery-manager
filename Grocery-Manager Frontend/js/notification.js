// Check if BroadcastChannel is supported
if (!window.BroadcastChannel) {
    alert("BroadcastChannel is not supported in this browser.");
} else {
    // Create and subscribe to the BroadcastChannel
    const notificationChannel = new BroadcastChannel('notification_channel');
    console.log("BroadcastChannel created and subscribed.");

    // Message handler to receive broadcast messages
    notificationChannel.onmessage = (event) => {
        console.log("Received message in BroadcastChannel:", event.data);

        if (Notification.permission === "granted") {
            console.log("Notification permission granted in current client.");
            new Notification(event.data.title, event.data.options);
        } else {
            console.warn("Notification permission not granted in current client.");
        }
    };

    // Check and request Notification permission if needed
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            console.log("Notification permission status after request:", permission);
            if (permission !== "granted") {
                alert("Notifications permission not granted.");
            }
        }).catch(error => {
            console.error("Error requesting notification permission:", error);
        });
    }

    // Add event listener to the send notification button
    document.getElementById('sendNotficationButton').addEventListener('click', () => {
        const storeName = document.getElementById('storeName').value;
        if (storeName === "") {
            alert("Store name is required");
            return;
        }

        // Get the userName from local storage
        const userName = localStorage.getItem("userName");
        if (!userName) {
            alert("User name not found in local storage.");
            return;
        }

        // Define the notification options
        const notificationOptions = {
            body: `${userName} is in store: ${storeName}`,
            icon: './images/MainLogoLightBlue.png',
        };

        // Post a message to the BroadcastChannel
        notificationChannel.postMessage({
            title: `${userName} is in a shop`,
            options: notificationOptions
        });

        console.log("Posted message to BroadcastChannel:", { title: `${userName} is in a shop`, options: notificationOptions });

        // Test direct notification to ensure it's working in current client
        if (Notification.permission === "granted") {
            new Notification(`${userName} is in a shop`, notificationOptions);
            console.log("Direct notification created in current client.");
        } else {
            console.warn("Direct notification not created due to lack of permission in current client.");
        }
    });
}
