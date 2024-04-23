document.addEventListener('DOMContentLoaded', function() {
    // Fetch weather details when the page is loaded
    fetchWeatherDetailsAndDisplay();
    // initMap();
});

async function fetchWeatherDetailsAndDisplay() {
    try {
        // Fetch latitude and longitude from localStorage (assuming they were saved during login)
        const username = localStorage.getItem('loggedInUser');
        const storedLocation = localStorage.getItem('userLocation');
        const { latitude, longitude } = JSON.parse(storedLocation);

        // Fetch weather details from the OpenWeatherMap API
        const apiKey = '01c8404013bcc52100638c0004dda58f';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        const response = await fetch(apiUrl);
        
        if (response.ok) {
            // const countryList = require("country-list");
            const data = await response.json();
            // Assuming the API response structure
            const temperature = data.main.temp;
            const conditions = data.weather[0].main;
            const windspeed = data.wind.speed;
            const city = data.name;
            const pressure = data.main.pressure;
            const humidity = data.main.humidity;
            // const country = data.sys.country;
            // const cont = countryList.getName(country);
            // Display weather information on the page
            const weatherInfoDiv = document.getElementById('weatherInfo');
            weatherInfoDiv.innerHTML = `<table>
            <tr>
                <th>Location:</th>
                <td>${city}</td>
            </tr>
        
            <tr>
                <th>Condition:</th>
                <td>${conditions}</td>
            </tr>
        
            <tr>
                <th>Temperature:</th>
                <td>${temperature} °C</td>
            </tr>
        
            <tr>
                <th>Pressure:</th>
                <td>${pressure} hpa</td>
            </tr>
        
            <tr>
                <th>Humidity:</th>
                <td>${humidity} %</td>
            </tr>
        
            <tr>
                <th>Wind Speed:</th>
                <td>${windspeed} m/s</td>
            </tr>
        </table>`

        initMap(latitude, longitude);
            // weatherInfoDiv.innerHTML = `<p>Location: ${city}</p><p>Temperature: ${temperature} °C</p><p>Pressure: ${pressure} hPa</p><p>Humidity: ${humidity} %</p><p>Conditions: ${conditions}</p><p>Wind Speed: ${windspeed} m/s</p>`;
        } else {
            throw new Error(`Failed to fetch weather data. Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
    }
}

// function submitMessage() {
//     const messageSection = document.getElementById('messageSection');
//     const userMessage = document.getElementById('userMessage').value;

//     if (userMessage.trim() === '') {
//         alert('Please enter a valid message.');
//         return;
//     }

//     // Create a new message element
//     const userMessageElement = document.createElement('div');
//     userMessageElement.className = 'message';
//     userMessageElement.textContent = userMessage;

//     // Add an icon (cross) to the right of the message
//     const icon = document.createElement('i');
//     icon.className = 'fas fa-times icon';
//     userMessageElement.appendChild(icon);

//     // Append the new message element to the message section
//     messageSection.appendChild(userMessageElement);

//     // Clear the textarea after submission
//     document.getElementById('userMessage').value = '';

//     // Add a click event listener to the icon for toggling
//     icon.addEventListener('click', function () {
//         toggleIconAndBackground(icon, userMessageElement);
//     });
// }

function toggleIconAndBackground(icon, messageElement) {
    // Toggle between cross and check icons
    if (icon.classList.contains('fa-times')) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-check');
        messageElement.classList.add('green');
    } else {
        icon.classList.remove('fa-check');
        icon.classList.add('fa-times');
        messageElement.classList.remove('green');
    }
}



function initMap(latitude,longitude) {
    // Simulating user location coordinates for demo purposes

    // Create a map centered at the user's location
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: latitude, lng: longitude },
        zoom: 12,
    });

    // Add a marker at the user's location
    const marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: 'User Location',
    });
}

function submitMessage() {
    const userMessage = document.getElementById('userMessage').value;

    if (userMessage.trim() === '') {
        alert('Please enter a valid message.');
        return;
    }

    // Make a request to the server with the user-submitted message
    fetch('/summarize_message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
    })
    .then(response => response.json())
    .then(summarizedDetails => {
        // Display the summarized details on the page
        displaySummarizedDetails(summarizedDetails);
    })
    .catch(error => {
        console.error('Error fetching summarized details:', error.message);
    });
}

function displaySummarizedDetails(summarizedDetails) {
    // Get the div where you want to display the summarized details
    const summarizedDetailsDiv = document.getElementById('summarizedDetails');

    // Create an HTML string with the summarized details
    let html = '<h2>Summarized Details:</h2>';
    html += '<ul>';

    // Iterate over the summarized details and create list items
    for (const [key, value] of Object.entries(summarizedDetails)) {
        html += `<li><strong>${key}:</strong> ${value}</li>`;
    }

    html += '</ul>';

    // Update the HTML content of the div
    summarizedDetailsDiv.innerHTML = html;
}