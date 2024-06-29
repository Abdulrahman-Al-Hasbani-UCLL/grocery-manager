let users = [];

const fetchUsers = async () => {
    try {
        const response = await fetch("http://localhost:8080/users");
        const result = await response.json();
        users = result;
        renderUsers(users);
    } catch (error) {
        console.error('Failed to fetch users:', error);
    }
};

const renderUsers = (usersList) => {
    const usersContainer = document.querySelector(".memberGrid");
    usersContainer.innerHTML = "";

    usersList.forEach((user) => {
        const userElement = document.createElement("h3");
        userElement.textContent = `${user.name}`; // Assuming each user object has a 'name' property
        usersContainer.appendChild(userElement);
    });
};

fetchUsers();