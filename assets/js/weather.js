/**
 * Weather widget for Barefoot Homestays
 * Location: Dhikuli, Ramnagar, Uttarakhand
 * Coordinates: 29.4768056, 79.1486389
 *
 * Uses wttr.in (https://wttr.in) — MIT-licensed, free for commercial use.
 * Attribution: Weather data from wttr.in (link displayed in the section).
 *
 * ETHICS & LEGAL NOTE:
 * wttr.in is MIT-licensed and explicitly allows commercial use with attribution.
 * No API key is required. No user data is collected or transmitted — only the
 * property's fixed geographic coordinates are sent to the weather service.
 * Attribution to wttr.in is displayed on the page as required by the licence.
 */
(function () {
  'use strict';

  var LAT = 29.4768056;
  var LON = 79.1486389;
  // wttr.in JSON API: returns current conditions + 3-day forecast
  var API_URL = 'https://wttr.in/' + LAT + ',' + LON + '?format=j1';

  // Map WorldWeatherOnline / wttr.in weather codes to emoji
  function weatherCodeEmoji(code) {
    code = parseInt(code, 10);
    if (code === 113)                           return '☀️';  // Clear/Sunny
    if (code === 116)                           return '⛅';  // Partly cloudy
    if (code === 119 || code === 122)           return '☁️';  // Cloudy/Overcast
    if (code === 143 || code === 248 || code === 260) return '🌫️'; // Mist/Fog
    if (code === 200)                           return '⛈️';  // Thundery outbreaks
    if (code === 227 || code === 230)           return '❄️';  // Blowing snow/Blizzard
    if (code >= 176 && code <= 185)             return '🌦️';  // Patchy rain/sleet/drizzle
    if (code >= 263 && code <= 284)             return '🌦️';  // Drizzle
    if (code >= 293 && code <= 308)             return '🌧️';  // Rain
    if (code >= 311 && code <= 320)             return '🌨️';  // Sleet
    if (code >= 323 && code <= 338)             return '❄️';  // Snow
    if (code === 350)                           return '🌨️';  // Ice pellets
    if (code >= 353 && code <= 359)             return '🌦️';  // Rain showers
    if (code >= 362 && code <= 377)             return '🌨️';  // Sleet/snow/ice showers
    if (code >= 386 && code <= 395)             return '⛈️';  // Thunder
    return '🌡️';
  }

  function shortDayName(dateStr) {
    // dateStr from wttr.in is always YYYY-MM-DD
    var parts = dateStr.split('-');
    var d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
  }

  function setText(id, text) {
    document.getElementById(id).textContent = text;
  }

  function renderCurrentWeather(cur) {
    setText('weather-icon-main', weatherCodeEmoji(cur.weatherCode));
    setText('weather-temp',      cur.temp_C + '°C');
    setText('weather-desc',      cur.weatherDesc[0].value);
    setText('weather-humidity',  cur.humidity + '%');
    setText('weather-wind',      cur.windspeedKmph + ' km/h');
    setText('weather-feels',     cur.FeelsLikeC + '°C');

    document.getElementById('weather-loading').style.display = 'none';
    document.getElementById('weather-current-content').style.display = '';
  }

  function makeForecastCard(day) {
    // Use the noon slot: wttr.in returns 8 three-hourly entries per day for hours
    // 0, 3, 6, 9, 12, 15, 18, 21 (indices 0–7); index 4 = hour 12 (noon).
    var noon = day.hourly[4] || day.hourly[0];

    var col = document.createElement('div');
    col.className = 'col-6 col-sm-4 col-md-3 col-lg';

    var card = document.createElement('div');
    card.className = 'card text-center shadow-sm h-100 weather-forecast-card';

    var body = document.createElement('div');
    body.className = 'card-body p-2';

    var dateDiv = document.createElement('div');
    dateDiv.className = 'small text-muted mb-1';
    dateDiv.textContent = shortDayName(day.date);

    var iconDiv = document.createElement('div');
    iconDiv.className = 'weather-icon-sm';
    iconDiv.textContent = weatherCodeEmoji(noon.weatherCode);

    var descDiv = document.createElement('div');
    descDiv.className = 'small fw-semibold mt-1';
    descDiv.textContent = noon.weatherDesc[0].value;

    var tempDiv = document.createElement('div');
    tempDiv.className = 'mt-1';

    var maxSpan = document.createElement('span');
    maxSpan.className = 'text-danger fw-bold';
    maxSpan.textContent = day.maxtempC + '°';

    var sep = document.createTextNode(' / ');

    var minSpan = document.createElement('span');
    minSpan.className = 'text-primary';
    minSpan.textContent = day.mintempC + '°';

    tempDiv.appendChild(maxSpan);
    tempDiv.appendChild(sep);
    tempDiv.appendChild(minSpan);

    body.appendChild(dateDiv);
    body.appendChild(iconDiv);
    body.appendChild(descDiv);
    body.appendChild(tempDiv);
    card.appendChild(body);
    col.appendChild(card);
    return col;
  }

  function renderForecast(days) {
    var container = document.getElementById('weather-forecast-cards');
    while (container.firstChild) { container.removeChild(container.firstChild); }
    for (var i = 0; i < days.length; i++) {
      container.appendChild(makeForecastCard(days[i]));
    }
    document.getElementById('weather-forecast').style.display = '';
  }

  function showError() {
    document.getElementById('weather-loading').style.display = 'none';
    document.getElementById('weather-error').style.display = '';
  }

  function loadWeather() {
    fetch(API_URL)
      .then(function (response) {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(function (data) {
        renderCurrentWeather(data.current_condition[0]);
        renderForecast(data.weather);
      })
      .catch(function (err) {
        console.error('Weather widget: failed to load weather data.', err);
        showError();
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadWeather);
  } else {
    loadWeather();
  }
})();
