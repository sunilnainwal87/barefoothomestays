/**
 * Weather & Air Quality widget for Barefoot Homestays
 * Location: Dhikuli, Ramnagar, Uttarakhand
 * Coordinates: 29.4768056, 79.1486389
 *
 * Weather: wttr.in (https://wttr.in) — MIT-licensed, free for commercial use.
 * AQI:     Open-Meteo Air Quality API (https://open-meteo.com) — free for
 *          commercial use under CC BY 4.0. No API key required. HTTPS only.
 *
 * ETHICS & LEGAL NOTE:
 * Both data sources are open-source and explicitly permit commercial use with
 * attribution. No API key is required and no user data is collected or
 * transmitted — only the property's fixed geographic coordinates are sent to
 * each service. Attributions are displayed on the page as required.
 */
(function () {
  'use strict';

  var LAT = 29.4768056;
  var LON = 79.1486389;
  // wttr.in JSON API: returns current conditions + 3-day forecast
  var API_URL = 'https://wttr.in/' + LAT + ',' + LON + '?format=j1';
  // Open-Meteo Air Quality API: US AQI + PM2.5 + PM10, current only
  var AQI_API_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality' +
    '?latitude=' + LAT + '&longitude=' + LON + '&current=us_aqi,pm2_5,pm10';

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

  // ----- AQI (Air Quality Index) -----

  // US AQI categories: [maxValue, label, textColor, bgColor]
  var AQI_CATEGORIES = [
    [  50, 'Good',                           '#1a7f37', '#dafbe1'],
    [ 100, 'Moderate',                       '#7d6514', '#fdf8c2'],
    [ 150, 'Unhealthy for Sensitive Groups', '#c85000', '#fff1d6'],
    [ 200, 'Unhealthy',                      '#c11c1c', '#ffeaea'],
    [ 300, 'Very Unhealthy',                 '#6b21a8', '#f3e8ff'],
    [Infinity, 'Hazardous',                  '#7f1d1d', '#fee2e2']
  ];

  // Returns category metadata for a US AQI value.
  function aqiCategory(aqi) {
    aqi = parseInt(aqi, 10);
    for (var i = 0; i < AQI_CATEGORIES.length; i++) {
      if (aqi <= AQI_CATEGORIES[i][0]) {
        return { label: AQI_CATEGORIES[i][1], color: AQI_CATEGORIES[i][2], bg: AQI_CATEGORIES[i][3] };
      }
    }
    return { label: AQI_CATEGORIES[AQI_CATEGORIES.length - 1][1], color: AQI_CATEGORIES[AQI_CATEGORIES.length - 1][2], bg: AQI_CATEGORIES[AQI_CATEGORIES.length - 1][3] };
  }

  function renderAQI(current) {
    var aqi = parseInt(current.us_aqi, 10);
    var cat = aqiCategory(aqi);

    var valueEl = document.getElementById('aqi-value');
    valueEl.textContent = aqi;
    valueEl.style.color = cat.color;

    var badgeEl = document.getElementById('aqi-badge');
    badgeEl.textContent = cat.label;
    badgeEl.style.backgroundColor = cat.bg;
    badgeEl.style.color = cat.color;
    badgeEl.style.border = '1px solid ' + cat.color;

    document.getElementById('aqi-icon').style.color = cat.color;

    var pm25 = parseFloat(current.pm2_5);
    var pm10  = parseFloat(current.pm10);
    setText('aqi-pm25', (isNaN(pm25) ? '—' : pm25.toFixed(1)) + ' µg/m³');
    setText('aqi-pm10',  (isNaN(pm10)  ? '—' : pm10.toFixed(1))  + ' µg/m³');

    document.getElementById('aqi-loading').style.display = 'none';
    document.getElementById('aqi-content').style.display = '';
  }

  function showAQIError() {
    document.getElementById('aqi-loading').style.display = 'none';
    document.getElementById('aqi-error').style.display = '';
  }

  function loadAQI() {
    fetch(AQI_API_URL)
      .then(function (response) {
        if (!response.ok) throw new Error('AQI network response was not ok');
        return response.json();
      })
      .then(function (data) {
        if (data && data.current) {
          renderAQI(data.current);
        } else {
          showAQIError();
        }
      })
      .catch(function (err) {
        console.error('AQI widget: failed to load air quality data.', err);
        showAQIError();
      });
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

  function init() {
    loadWeather();
    loadAQI();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
