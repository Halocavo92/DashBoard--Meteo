# API meteo

In questo progetto i dati del meteo sono pensati per arrivare da un servizio esterno, come OpenWeatherMap o Open-Meteo.

L'idea è mostrare informazioni semplici: temperatura, vento e condizioni del cielo. Questa versione è un esempio, quindi al momento i dati non vengono letti da un'API in tempo reale.

## Parametri utili per Open-Meteo

| Parametro / Campo | Significato |
| --- | --- |
| `latitude`, `longitude` | Coordinate della città |
| `current=temperature_2m,wind_speed_10m,weather_code` | Richiede temperatura, vento e codice meteo attuale |
| `daily=temperature_2m_max,temperature_2m_min` | Richiede temperature massime e minime giornaliere |
| `timezone=auto` | Usa automaticamente il fuso orario locale |

## Campi principali usati

| Campo | Significato |
| --- | --- |
| `current.temperature_2m` | Temperatura attuale |
| `current.wind_speed_10m` | Velocità del vento |
| `daily.temperature_2m_min` | Temperatura minima giornaliera |
| `daily.temperature_2m_max` | Temperatura massima giornaliera |
