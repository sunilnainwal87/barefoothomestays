/**
 * Weather widget for Barefoot Homestays
 * Location: Dhikuli, Ramnagar, Uttarakhand
 * Coordinates: 29.4768056, 79.1486389
 * Uses the free Open-Meteo API (https://open-meteo.com/) – no API key required.
 */
(function () {
  'use strict';

  const LAT = 29.4768056;
  const LON = 79.1486389;
  const API_URL =
    'https://api.open-meteo.com/v1/forecast' +
    '?latitude=' + LAT +
    '&longitude=' + LON +
    '&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m' +
    '&daily=weather_code,temperature_2m_max,temperature_2m_min' +
    '&timezone=Asia%2FKolkata' +
    '&forecast_days=7';

  // WMO Weather interpretation codes → { description, emoji }
  function interpretWeatherCode(code) {
    if (code === 0)              return { desc: 'Clear Sky',            emoji: '☀️' };
    if (code === 1)              return { desc: 'Mainly Clear',         emoji: '🌤️' };
    if (code === 2)              return { desc: 'Partly Cloudy',        emoji: '⛅' };
    if (code === 3)              return { desc: 'Overcast',             emoji: '☁️' };
    if (code === 45 || code === 48) return { desc: 'Foggy',            emoji: '🌫️' };
    if (code >= 51 && code <= 55)  return { desc: 'Drizzle',           emoji: '🌦️' };
    if (code >= 61 && code <= 65)  return { desc: 'Rain',              emoji: '🌧️' };
    if (code >= 71 && code <= 75)  return { desc: 'Snow',              emoji: '❄️' };
    if (code === 77)               return { desc: 'Snow Grains',        emoji: '🌨️' };
    if (code >= 80 && code <= 82)  return { desc: 'Rain Showers',      emoji: '🌦️' };
    if (code >= 85 && code <= 86)  return { desc: 'Snow Showers',      emoji: '🌨️' };
    if (code === 95)               return { desc: 'Thunderstorm',       emoji: '⛈️' };
    if (code === 96 || code === 99) return { desc: 'Thunderstorm & Hail', emoji: '⛈️' };
    return { desc: 'Unknown', emoji: '🌡️' };
  }

  function shortDayName(dateStr) {
    // dateStr from Open-Meteo is always YYYY-MM-DD (local date, no time component)
    var parts = dateStr.split('-');
    var d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
  }

  function renderCurrentWeather(current) {
    var weather = interpretWeatherCode(current.weather_code);
    document.getElementById('weather-icon-main').textContent = weather.emoji;
    document.getElementById('weather-temp').textContent = Math.round(current.temperature_2m) + '°C';
    document.getElementById('weather-desc').textContent = weather.desc;
    document.getElementById('weather-humidity').textContent = current.relative_humidity_2m + '%';
    document.getElementById('weather-wind').textContent = Math.round(current.wind_speed_10m) + ' km/h';
    document.getElementById('weather-feels').textContent = Math.round(current.apparent_temperature) + '°C';

    document.getElementById('weather-loading').style.display = 'none';
    document.getElementById('weather-current-content').style.display = '';
  }

  function renderForecast(daily) {
    var container = document.getElementById('weather-forecast-cards');
    container.innerHTML = '';
    for (var i = 0; i < daily.time.length; i++) {
      var weather = interpretWeatherCode(daily.weather_code[i]);
      var card = document.createElement('div');
      card.className = 'col-6 col-sm-4 col-md-3 col-lg';
      card.innerHTML =
        '<div class="card text-center shadow-sm h-100 weather-forecast-card">' +
          '<div class="card-body p-2">' +
            '<div class="small text-muted mb-1">' + shortDayName(daily.time[i]) + '</div>' +
            '<div class="weather-icon-sm">' + weather.emoji + '</div>' +
            '<div class="small fw-semibold mt-1">' + weather.desc + '</div>' +
            '<div class="mt-1">' +
              '<span class="text-danger fw-bold">' + Math.round(daily.temperature_2m_max[i]) + '°</span>' +
              ' / ' +
              '<span class="text-primary">' + Math.round(daily.temperature_2m_min[i]) + '°</span>' +
            '</div>' +
          '</div>' +
        '</div>';
      container.appendChild(card);
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
        renderCurrentWeather(data.current);
        renderForecast(data.daily);
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
