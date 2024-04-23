function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulate user authentication (you can replace this with actual authentication logic)
    if (checkCredentials(username, password)) {
        // Set the logged-in user in localStorage
        localStorage.setItem('loggedInUser', username);

        // Fetch user's location and display weather details
        fetchLocation();
    } else {
        alert('Invalid username or password.');
    }
}

function showRegistrationForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('registration-form').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('registration-form').style.display = 'none';
}

function createAccount() {
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    // Simulate account creation
    localStorage.setItem(newUsername, newPassword);

    // Set the logged-in user in localStorage
    localStorage.setItem('loggedInUser', newUsername);

    // Fetch user's location and display weather details
    // fetchLocation();

    alert('Account created successfully! You can now login.');
}

function checkCredentials(username, password) {
    // Replace this with your actual authentication logic
    const storedPassword = localStorage.getItem(username);
    return password === storedPassword;
}

function fetchLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                localStorage.setItem('userLocation', JSON.stringify({ latitude, longitude }));
                // Redirect to weather.html
                window.location.href = 'weather.html';
            },
            error => {
                console.error('Error getting location:', error.message);
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}
