// Function to handle radio button change
function onUserTypeChange() {
    const userType = document.querySelector('input[name="userType"]:checked').value;
    // document.querySelector('input[name="userType"][value="' + userType + '"]').checked = true;
    showLoginModal(userType);
}

// Add event listener to radio buttons
document.querySelectorAll('input[name="userType"]').forEach(radio => {
    radio.addEventListener('change', onUserTypeChange);
});

// Function to show login modal based on user type
function showLoginModal(userType) {
    if (userType === 'user') {
        showUserLoginModal();
    } else if (userType === 'rescueTeam') {
        showOrgLoginModal();
    }
}

// Function to show user login modal
function showUserLoginModal() {
    document.getElementById('myModal').style.display = 'block';
    document.getElementById('OrgModal').style.display = 'none';
}

// Function to show organization login modal
function showOrgLoginModal() {
    document.getElementById('OrgModal').style.display = 'block';
    document.getElementById('myModal').style.display = 'none';
}

function login() {
    // clearAllDetails();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulate user authentication (you can replace this with actual authentication logic)
    if (checkCredentials(username, password)) {
        // Set the logged-in user in localStorage
        localStorage.setItem('loggedInUser', username);
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        alert('LoggedIn Successfully..!!!')
        // Fetch user's location and display weather details
        fetchLocation();
    } else {
        if (username === '' || password === '') {
            alert('Please enter your credentials and try again.');
        }
        else {
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            alert('Invalid username or password.');
        }
    }
}

// function clearAllDetails() {
//     localStorage.clear();
//     alert('All details cleared from local storage.');
// }


function showRegistrationForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('registration-form').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('registration-form').style.display = 'none';
}


function showOrgRegForm() {
    document.getElementById('login-form1').style.display = 'none';
    document.getElementById('registration-form1').style.display = 'block';
}

function showOrgLogForm() {
    document.getElementById('login-form1').style.display = 'block';
    document.getElementById('registration-form1').style.display = 'none';
}

function createAccount() {
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    if (newUsername === '' || newPassword === '') {
        alert('Please enter all required information to create an account.');
    }
    else {
        // Simulate account creation
        localStorage.setItem(newUsername, newPassword);

        // Set the logged-in user in localStorage
        localStorage.setItem('loggedInUser', newUsername);

        // Fetch user's location and display weather details
        // fetchLocation();
        document.getElementById('newUsername').value = '';
        document.getElementById('newPassword').value = '';

        alert('Account created successfully! You can now login.');
    }
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
                window.location.href = 'community.html';
            },
            error => {
                console.error('Error getting location:', error.message);
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

function fetchLocation1() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                localStorage.setItem('userLocation', JSON.stringify({ latitude, longitude }));
                // Redirect to weather.html
                window.location.href = 'organization.html';
            },
            error => {
                console.error('Error getting location:', error.message);
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}
// Open modal when the login/signup button is clicked
document.getElementById('loginBtn').addEventListener('click', function () {
    document.getElementById('myModal').style.display = 'block';
});

// Close modal when the close button is clicked
function closeModal() {
    document.getElementById('myModal').style.display = 'none';
    document.getElementById('OrgModal').style.display = 'none';
}

// Close modal when clicking outside the modal
window.onclick = function (event) {
    if (event.target === document.getElementById('myModal')) {
        document.getElementById('myModal').style.display = 'none';
    }

    if (event.target === document.getElementById('OrgModal')) {
        document.getElementById('OrgModal').style.display = 'none';
    }
}



let userName, userMobile, verificationCode, userPassword;

// Initialize Email.js with your service ID
emailjs.init("VIp6E9tzPYQCRjjOQ");

function requestCallback() {
    // Step 1: Get user info
    userName = document.getElementById('newUsername1').value;
    userMobile = document.getElementById('newPhone1').value;

    // Simulate sending notification to owner's email (replace with your backend logic)
    sendNotificationToOwner(userName, userMobile);
}

function verifyCode() {
    // Step 2: Get verification code
    verificationCode = document.getElementById('verificationCode1').value;

    // Simulate verification logic (replace with your backend logic)
    // const isVerified = verifyWithBackend(verificationCode);

    // Proceed to Step 3 if verification is successful
    if (verificationCode === '123456') {
        alert("Verified");
        return true;
    } else {
        // verificationCode.style.border = '1px solid red';
        document.getElementById('verificationCode1').value = '';
        alert('Invalid verification code. Please try again.');
        return false;
    }
}

function createOrgAccount() {
    // Step 3: Get user password
    const verify = verifyCode();
    if (verify) {
        userPassword = document.getElementById('newPassword1').value;

        if (userName === '' || userPassword === '' || verificationCode === '') {
            alert('Please enter all required information to create an account.');
        }
        else {
            // Simulate account creation
            localStorage.setItem(userName, userPassword);

            // Set the logged-in user in localStorage
            localStorage.setItem('loggedInUser', userName);

            // Fetch user's location and display weather details
            // fetchLocation();
            document.getElementById('newUsername1').value = '';
            document.getElementById('newPassword1').value = '';
            document.getElementById('verificationCode1').value = '';
            document.getElementById('newPhone1').value = '';

            alert('Account created successfully! You can now login.');
        }
    }

}

function sendNotificationToOwner(userName, userMobile) {
    // Simulate sending email to owner using Email.js
    const templateParams = {
        userName: userName,
        userMobile: userMobile,
        to_email: 'bbyart58@gmail.com', // Replace with owner's email
        subject: 'New User Callback Request',
        message: `${userName} with mobile number ${userMobile} requested a callback to create an Organization account.`
    };

    emailjs.send('service_fwk5erd', 'template_ccfio1f', templateParams)
        .then((response) => {
            alert('Request submitted!');
        })
        .catch((error) => {
            alert('Error sending email:', error);
        });
}


function Orglogin() {
    // clearAllDetails();
    const Username = document.getElementById('username1').value;
    const passWord = document.getElementById('password1').value;

    // Simulate user authentication (you can replace this with actual authentication logic)
    if (checkCredentials(Username, passWord)) {
        // Set the logged-in user in localStorage
        localStorage.setItem('loggedInUser', Username);
        document.getElementById('username1').value = '';
        document.getElementById('password1').value = '';
        alert('LoggedIn Successfully..!!!')
        // Fetch user's location and display weather details
        fetchLocation1();
    } else {
        if (Username === '' || passWord === '') {
            alert('Please enter your credentials and try again.');
        }
        else {
            document.getElementById('username1').value = '';
            document.getElementById('password1').value = '';
            alert('Invalid username or password.');
        }
    }
}



