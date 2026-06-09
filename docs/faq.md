# Domande frequenti

Qui ho raccolto le domande che mi sono fatto io stesso mentre mettevo insieme il progetto, più qualcuna che mi hanno chiesto provandolo.

## Come apro il sito?
Basta aprire `index.html` con un doppio clic e parte nel browser. Io però lavoro con Live Server su VS Code, perché ricarica la pagina da solo ogni volta che salvo ed è più comodo durante le prove.

## Mi serve internet?
Sì, per due motivi: Bootstrap lo prendo da un CDN, e soprattutto i dati meteo arrivano in diretta da Open-Meteo. Offline le pagine si aprono lo stesso, ma resta tutto vuoto.

## Dove vedo il meteo attuale?
Nella pagina `meteo.html`, che raggiungi anche dalla navbar in alto. Mostra le card delle prime tre città.

## E le previsioni?
Sono in `previsioni.html`. Lì c'è la tabella con minime e massime giorno per giorno. Per ora è fissa su Firenze, la prima città della lista.

## Quale API usa?
Solo Open-Meteo. All'inizio avevo scritto nei documenti anche OpenWeatherMap, ma alla fine non l'ho usata, quindi ho tolto il riferimento per non confondere.

## Serve una chiave API?
No, ed è il bello di Open-Meteo: nessuna registrazione, nessuna chiave. Si chiama l'indirizzo e basta.

## Posso aggiungere o cambiare le città?
Sì. In cima a `script.js` c'è l'array `CITIES`: aggiungi un oggetto con nome, latitudine e longitudine e compare anche nel sito. Le coordinate le trovo cercando il nome della città su Open-Meteo o su una mappa.

## Serve un server web?
No, è tutto statico. Niente PHP, niente database, niente da installare lato server.

## Posso usarlo per imparare?
Per quello l'ho fatto. Se ti va, smonta il codice e cambialo: è il modo migliore per capire come funziona una chiamata `fetch` a un'API.
