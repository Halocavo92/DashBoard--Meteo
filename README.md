# DashBoard--Meteo

Questa è la mia dashboard meteo, un piccolo progetto front-end con cui ho voluto provare a collegare un sito a un'API vera. Niente di complicato: tre pagine HTML, un po' di Bootstrap per non perdere tempo con il CSS da zero, e uno script che va a chiedere i dati a Open-Meteo.

All'inizio pensavo di usare dei dati finti, poi ho deciso di collegare davvero l'API così la pagina mostra il meteo reale al momento in cui la apri.

🔗 **Sito online:** [halocavo92.github.io/DashBoard--Meteo](https://halocavo92.github.io/DashBoard--Meteo/) — l'ho pubblicato con GitHub Pages, così si può provare direttamente senza scaricare niente.

## Cosa fa

La homepage presenta il progetto e una navbar per spostarsi tra le sezioni. Nella pagina meteo trovo le card con la temperatura attuale, il vento e la condizione del cielo per le prime tre città. La pagina previsioni invece carica una tabella con minime e massime giorno per giorno.

## Le città

Nel codice ne ho messe cinque: Firenze, Roma, Milano, Parigi e Tokyo. La pagina del meteo attuale ne mostra solo le prime tre (le altre due servono per le prove e per le previsioni). Firenze è la prima della lista perché è quella che uso di default nelle previsioni.

## Tecnologie

- HTML e CSS per la struttura e lo stile
- Bootstrap 5 (preso da CDN, quindi serve la connessione)
- JavaScript "vanilla", senza framework
- API di [Open-Meteo](https://open-meteo.com/), gratuita e senza chiave

## Come è organizzato

- `index.html` — la homepage
- `meteo.html` — il meteo attuale, con le card
- `previsioni.html` — la tabella delle previsioni
- `style.css` — qualche stile mio in aggiunta a Bootstrap
- `script.js` — tutta la logica delle chiamate all'API
- `assets/` — immagini e risorse
- `docs/` — le note su installazione, API e domande frequenti

## Documentazione

Ho diviso le note in tre file dentro `docs/`: `installazione.md` per far partire il progetto, `api.md` per capire come uso Open-Meteo e `faq.md` per le domande più comuni.

## Licenza

Ho rilasciato il progetto con licenza **MIT** (il file [LICENSE](LICENSE)). L'ho scelta perché è la più semplice e permissiva: chiunque può usare, copiare e modificare il codice, anche per altri progetti, basta che resti il riconoscimento dell'autore. Trattandosi di un esercizio pensato per imparare e da mostrare, mi sembrava la scelta più sensata: non volevo mettere paletti a chi vuole prenderlo come spunto.

## Autore

Halocavo92

