function activerSousTitres() {
    return new Promise((resolve, reject) => {
        const boutonSousTitres = document.querySelector("#primary-button > ytd-button-renderer > yt-button-shape > button");

        if (boutonSousTitres) {
            console.log("Bouton des sous-titres cliqué");
            boutonSousTitres.click();
            resolve();
        } else {
            console.error('Bouton des sous-titres non trouvé.');
            reject('Bouton des sous-titres non trouvé.');
        }
    });
}

function extraireSousTitres() {
    return new Promise((resolve, reject) => {
        const segments = document.querySelectorAll('ytd-transcript-segment-renderer');

        if (segments.length === 0) {
            console.error('Aucun sous-titre trouvé.');
            reject('Aucun sous-titre trouvé.');
            return;
        }

        const sousTitres = Array.from(segments).map(segment => {
            const timestamp = segment.querySelector('.segment-timestamp').innerText;
            const texte = segment.querySelector('.segment-text').innerText;
            return { timestamp, texte };
        });

        console.log("Sous-titres extraits: ", sousTitres);
        resolve(sousTitres);
    });
}

function initialiserExtraction() {
    activerSousTitres().then(() => {
        setTimeout(() => {
            extraireSousTitres().then(sousTitres => {
                window.sousTitresExtraits = sousTitres;
            }).catch(error => console.error("Erreur lors de l'extraction des sous-titres: ", error));
        }, 3000);
    }).catch(error => console.error("Erreur lors de l'activation des sous-titres: ", error));
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "demandeSousTitres") {
    console.log("Demande de sous-titres reçue");
    chrome.runtime.sendMessage({
      action: "afficherSousTitres",
      sousTitres: window.sousTitresExtraits
    });
  }
});

setTimeout(initialiserExtraction, 2000);