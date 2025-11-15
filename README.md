# Weather App

A beautiful, modern web application that fetches and displays weather information based on user location or a manually entered city name.

## Features

- 🌍 **Location-based weather**: Automatically fetch weather using your device's geolocation
- 🔍 **City search**: Search for weather in any city worldwide
- 📊 **Comprehensive data**: Display temperature, feels-like temperature, humidity, wind speed, pressure, and visibility
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- 📱 **Responsive**: Works perfectly on desktop and mobile devices

## Setup Instructions

1. **Get an API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Get your API key from the dashboard

2. **Configure the API Key**
   - Open `script.js`
   - Replace `YOUR_API_KEY` on line 4 with your actual API key:
   ```javascript
   const API_KEY = 'your-actual-api-key-here';
   ```

3. **Run the Application**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     ```
   - Navigate to `http://localhost:8000` in your browser

## Usage

1. **Search by City**: Enter a city name in the search box and click "Search" or press Enter
2. **Use Current Location**: Click the "📍 Use My Location" button to get weather for your current location (requires location permission)

## Technologies Used

- HTML5
- CSS3 (with modern features like Grid, Flexbox, and animations)
- Vanilla JavaScript (ES6+)
- OpenWeatherMap API

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Notes

- The free tier of OpenWeatherMap API has rate limits (60 calls/minute)
- Location access requires HTTPS in production (works on localhost for development)
- UV Index is not available in the free current weather API endpoint

