// Fonction pour cliquer sur le bouton des sous-titres
function activerSousTitres() {
    return new Promise((resolve, reject) => {
        const boutonSousTitres = document.querySelector("#primary-button > ytd-button-renderer > yt-button-shape > button");

        if (boutonSousTitres) {
            boutonSousTitres.click();
            resolve();
        } else {
            reject('Bouton des sous-titres non trouvé.');
        }
    });
}

// Fonction pour extraire les sous-titres
function extraireSousTitres() {
    return new Promise((resolve, reject) => {
        const segments = document.querySelectorAll('ytd-transcript-segment-renderer');

        if (segments.length === 0) {
            reject('Aucun sous-titre trouvé.');
            return;
        }

        const sousTitres = Array.from(segments).map(segment => {
            const timestamp = segment.querySelector('.segment-timestamp').innerText;
            const texte = segment.querySelector('.segment-text').innerText;
            return { timestamp, texte };
        });

        resolve(sousTitres);
    });
}

// Fonction pour initialiser l'extraction des sous-titres
function initialiserExtraction() {
    activerSousTitres().then(() => {
        setTimeout(() => {
            extraireSousTitres().then(sousTitres => {
                // Envoyer les sous-titres à la popup
                chrome.runtime.sendMessage({
                    action: "afficherSousTitres",
                    sousTitres: sousTitres
                });
            }).catch(error => console.error(error));
        }, 3000); // Attendre 3 secondes pour le chargement des sous-titres
    }).catch(error => console.error(error));
}


setTimeout(initialiserExtraction, 2000);
