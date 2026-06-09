# API meteo

Per i dati ho scelto Open-Meteo. Il motivo è pratico: è gratuita, non chiede registrazione né chiave API, e per un progetto di studio come questo è perfetta. Avevo guardato anche OpenWeatherMap, ma lì serviva creare un account e gestire una chiave, e mi sembrava un giro inutile.

La chiamata che faccio è una sola, all'indirizzo `https://api.open-meteo.com/v1/forecast`, e ci attacco i parametri qui sotto. Tutto quello che mi serve (meteo attuale + previsioni) arriva con quell'unica richiesta.

## Parametri che passo

| Parametro | A cosa serve |
| --- | --- |
| `latitude`, `longitude` | Le coordinate della città. Le ho scritte a mano nel file `script.js` |
| `current=temperature_2m,wind_speed_10m,weather_code` | Mi dà il meteo di adesso: temperatura, vento e il codice della condizione |
| `daily=temperature_2m_max,temperature_2m_min` | Le minime e massime di ogni giorno, per la tabella delle previsioni |
| `timezone=auto` | Così gli orari arrivano già nel fuso della città, senza dover convertire io |

## Campi della risposta che uso

| Campo | Cosa contiene |
| --- | --- |
| `current.temperature_2m` | La temperatura attuale |
| `current.wind_speed_10m` | La velocità del vento |
| `current.weather_code` | Un numero che traduco in testo (es. 0 = "Cielo sereno") |
| `daily.temperature_2m_min` | La minima del giorno |
| `daily.temperature_2m_max` | La massima del giorno |

Una nota sul `weather_code`: l'API restituisce un numero, non una descrizione. Nel codice ho fatto una piccola tabella di conversione per trasformarlo in italiano. Non ho messo tutti i codici esistenti, solo quelli che capitano più spesso; se ne arriva uno che non ho previsto, mostro semplicemente "Codice meteo" seguito dal numero.
