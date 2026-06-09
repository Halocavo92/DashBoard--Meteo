// Dashboard meteo - chiamate a Open-Meteo.
// Questo file lo usano due pagine: meteo.html (le card del meteo attuale,
// nel div #weather-list) e previsioni.html (la tabella, nel div #forecast-table).
// Tengo tutto in un unico file così non devo duplicare le funzioni.

// Le città le scrivo qui a mano con le loro coordinate. Per aggiungerne una
// basta mettere un nuovo oggetto in questa lista.
const CITIES = [
  { name: "Firenze", latitude: 43.7696, longitude: 11.2558 },
  { name: "Roma", latitude: 41.9028, longitude: 12.4964 },
  { name: "Milano", latitude: 45.4642, longitude: 9.1900 },
  { name: "Parigi", latitude: 48.8566, longitude: 2.3522 },
  { name: "Tokyo", latitude: 35.6762, longitude: 139.6503 }
];

// Aspetto che la pagina sia carica, poi controllo quale dei due contenitori
// esiste. Così lo stesso script capisce da solo su quale pagina si trova:
// se trova #weather-list carico le card, se trova #forecast-table la tabella.
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("#weather-list")) {
    loadCurrentWeather();
  }
  if (document.querySelector("#forecast-table")) {
    setupCitySelect();
    // Per le previsioni parto dalla prima città della lista (Firenze).
    loadForecast(CITIES[0]);
  }
});

// Riempie il menu a tendina con tutte le città e ricarica la tabella quando
// l'utente ne sceglie una diversa. Uso l'indice dell'array come valore così
// non devo cercare la città per nome.
function setupCitySelect() {
  const select = document.querySelector("#city-select");
  if (!select) return;

  select.innerHTML = CITIES
    .map((city, index) => `<option value="${index}">${city.name}</option>`)
    .join("");

  select.addEventListener("change", () => {
    loadForecast(CITIES[select.value]);
  });
}

// Costruisco l'URL della chiamata. Uso URLSearchParams invece di concatenare
// le stringhe a mano: è più pulito e mi mette i parametri nel formato giusto.
function buildWeatherUrl(city) {
  const params = new URLSearchParams({
    latitude: city.latitude,
    longitude: city.longitude,
    current: "temperature_2m,wind_speed_10m,weather_code",
    daily: "temperature_2m_max,temperature_2m_min",
    timezone: "auto"
  });
  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
}

// Piccola funzione di appoggio per le chiamate. Controllo response.ok perché
// fetch da solo NON lancia un errore sugli stati tipo 404 o 500: senza questo
// controllo proverei a leggere un JSON che non c'è. Se va male lancio io l'errore.
async function getJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Errore HTTP: ${response.status}`);
  }
  return await response.json();
}

// Open-Meteo mi dà la condizione del cielo come numero (weather_code), non come
// testo. Qui lo traduco in italiano. Non ho messo proprio tutti i codici, solo
// quelli più comuni; se ne arriva uno fuori lista lo gestisco sotto.
function weatherCodeToText(code) {
  const codes = {
    0: "Cielo sereno",
    1: "Prevalentemente sereno",
    2: "Parzialmente nuvoloso",
    3: "Coperto",
    45: "Nebbia",
    48: "Nebbia con brina",
    51: "Pioviggine leggera",
    53: "Pioviggine moderata",
    55: "Pioviggine intensa",
    61: "Pioggia leggera",
    63: "Pioggia moderata",
    65: "Pioggia intensa",
    71: "Neve leggera",
    73: "Neve moderata",
    75: "Neve intensa",
    80: "Rovesci leggeri",
    81: "Rovesci moderati",
    82: "Rovesci intensi",
    95: "Temporale"
  };
  // Se il codice non è nella tabella mostro almeno il numero, così non resta vuoto.
  return codes[code] || `Codice meteo ${code}`;
}

// Mostra un riquadro colorato di Bootstrap. Lo riuso sia per i messaggi di
// "caricamento" sia per gli errori, cambiando solo il tipo (info, danger...).
function showAlert(container, message, type = "warning") {
  container.innerHTML = `
    <div class="alert alert-${type}" role="alert">
      ${message}
    </div>
  `;
}

// Carica le card del meteo attuale (pagina meteo.html).
async function loadCurrentWeather() {
  const container = document.querySelector("#weather-list");
  // Prima mostro un messaggio di attesa, così l'utente non vede la pagina vuota
  // mentre arrivano i dati.
  container.innerHTML = `
    <div class="col-12">
      <div class="alert alert-info">Caricamento dati meteo...</div>
    </div>
  `;

  try {
    // Prendo solo le prime 3 città per non riempire troppo la pagina.
    // Uso Promise.all così le chiamate partono insieme invece che una alla volta:
    // è più veloce che aspettare la fine di ognuna prima di iniziare la successiva.
    const results = await Promise.all(
      CITIES.slice(0, 3).map(async city => {
        const data = await getJSON(buildWeatherUrl(city));
        return { city, data };
      })
    );

    container.innerHTML = results.map(({ city, data }) => {
      const current = data.current;
      return `
        <div class="col-md-4">
          <article class="card h-100 shadow-sm">
            <div class="card-body">
              <h2 class="h4 card-title">${city.name}</h2>
              <p class="display-6 mb-2">${current.temperature_2m} °C</p>
              <p class="mb-1"><strong>Vento:</strong> ${current.wind_speed_10m} km/h</p>
              <p class="mb-1"><strong>Condizione:</strong> ${weatherCodeToText(current.weather_code)}</p>
              <p class="small text-body-secondary mb-0">Dato aggiornato: ${current.time}</p>
            </div>
          </article>
        </div>
      `;
    }).join("");
  } catch (error) {
    // Se qualcosa va storto (rete giù, API che non risponde...) lo dico
    // chiaramente con un alert rosso invece di lasciare la pagina rotta.
    container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger" role="alert">
          Impossibile caricare i dati meteo. Dettaglio: ${error.message}
        </div>
      </div>
    `;
  }
}

// Carica la tabella delle previsioni (pagina previsioni.html) per una città.
async function loadForecast(city) {
  const container = document.querySelector("#forecast-table");
  showAlert(container, `Caricamento previsioni per ${city.name}...`, "info");

  try {
    const data = await getJSON(buildWeatherUrl(city));
    const daily = data.daily;

    // I dati giornalieri arrivano come array paralleli (date, minime, massime):
    // scorro le date e per ogni giorno prendo la min e la max con lo stesso indice.
    const rows = daily.time.map((day, index) => `
      <tr>
        <td>${day}</td>
        <td>${daily.temperature_2m_min[index]} °C</td>
        <td>${daily.temperature_2m_max[index]} °C</td>
      </tr>
    `).join("");

    container.innerHTML = `
      <h2 class="h4 mb-3">Previsioni per ${city.name}</h2>
      <div class="table-responsive">
        <table class="table table-striped table-bordered align-middle">
          <thead class="table-dark">
            <tr>
              <th>Data</th>
              <th>Temperatura minima</th>
              <th>Temperatura massima</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  } catch (error) {
    showAlert(container, `Impossibile caricare le previsioni. Dettaglio: ${error.message}`, "danger");
  }
}
