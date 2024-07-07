document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const name = formData.get('name');
    const password = formData.get('password');
    const url = `http://localhost:8080/users/login?name=${encodeURIComponent(name)}&password=${encodeURIComponent(password)}`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => {
        if (!response.ok) {
            alert('Network response was not ok');
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data === true) {
            window.location.href = 'home.html';
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', `${name}`);
            console.log("Auth successful");
        } else {
            alert('Invalid login');
            console.log("Auth unsuccessful");
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
