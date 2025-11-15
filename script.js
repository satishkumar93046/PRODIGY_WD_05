// API Configuration
// IMPORTANT: Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
// Get your free API key at: https://openweathermap.org/api
const API_KEY = 'b76a3c433df494dd6b78a59541f0156d';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_ICON_URL = 'https://openweathermap.org/img/wn/';

// DOM Elements
const locationInput = document.getElementById('locationInput');
const searchBtn = document.getElementById('searchBtn');
const currentLocationBtn = document.getElementById('currentLocationBtn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const weatherInfo = document.getElementById('weatherInfo');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});
currentLocationBtn.addEventListener('click', handleCurrentLocation);

// Handle search by city name
async function handleSearch() {
    const city = locationInput.value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    hideError();
    showLoading();
    try {
        await fetchWeatherByCity(city);
    } catch (err) {
        showError(err.message || 'Failed to fetch weather data');
    } finally {
        hideLoading();
    }
}

// Handle current location
function handleCurrentLocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }
    
    hideError();
    showLoading();
    
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            try {
                const { latitude, longitude } = position.coords;
                await fetchWeatherByCoords(latitude, longitude);
            } catch (err) {
                showError(err.message || 'Failed to fetch weather data');
            } finally {
                hideLoading();
            }
        },
        (err) => {
            hideLoading();
            showError('Unable to retrieve your location. Please allow location access or search by city name.');
        }
    );
}

// Fetch weather by city name
async function fetchWeatherByCity(city) {
    const url = `${API_BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Debug: Log response for troubleshooting
        console.log('API Response:', data);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the spelling and try again.');
            } else if (response.status === 401) {
                const errorMsg = data.message || 'Invalid API key. Please check your API configuration.';
                console.error('API Error:', errorMsg, data);
                throw new Error(errorMsg);
            } else {
                throw new Error(data.message || `Failed to fetch weather data. Status: ${response.status}`);
            }
        }
        
        displayWeather(data);
    } catch (err) {
        if (err.message) {
            throw err;
        }
        throw new Error('Network error. Please check your internet connection.');
    }
}

// Fetch weather by coordinates
async function fetchWeatherByCoords(lat, lon) {
    const url = `${API_BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error(data.message || 'Invalid API key. Please check your API configuration.');
            } else {
                throw new Error(data.message || `Failed to fetch weather data. Status: ${response.status}`);
            }
        }
        
        displayWeather(data);
    } catch (err) {
        if (err.message) {
            throw err;
        }
        throw new Error('Network error. Please check your internet connection.');
    }
}

// Display weather data
function displayWeather(data) {
    // Update location
    document.getElementById('cityName').textContent = data.name;
    document.getElementById('country').textContent = data.sys.country;
    
    // Update main weather
    const iconCode = data.weather[0].icon;
    document.getElementById('weatherIcon').src = `${API_ICON_URL}${iconCode}@2x.png`;
    document.getElementById('weatherIcon').alt = data.weather[0].description;
    
    document.getElementById('temperature').textContent = Math.round(data.main.temp);
    document.getElementById('description').textContent = data.weather[0].description;
    
    // Update details
    document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°C`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
    
    // Visibility (in meters, convert to km)
    const visibility = data.visibility ? (data.visibility / 1000).toFixed(1) : 'N/A';
    document.getElementById('visibility').textContent = visibility !== 'N/A' ? `${visibility} km` : 'N/A';
    
    // UV Index (not available in current weather API, would need UV index API)
    document.getElementById('uvIndex').textContent = 'N/A';
    
    // Show weather info
    weatherInfo.classList.remove('hidden');
}

// UI Helper Functions
function showLoading() {
    loading.classList.remove('hidden');
    weatherInfo.classList.add('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showError(message) {
    error.textContent = message;
    error.classList.remove('hidden');
    weatherInfo.classList.add('hidden');
}

function hideError() {
    error.classList.add('hidden');
}

// Check if API key is set
if (API_KEY === 'YOUR_API_KEY') {
    document.addEventListener('DOMContentLoaded', () => {
        showError('Please set your OpenWeatherMap API key in script.js. Get a free key at https://openweathermap.org/api');
    });
}

