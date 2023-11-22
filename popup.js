document.getElementById('getSubtitles').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "demandeSousTitres"});
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "afficherSousTitres") {
        // Débuter avec une balise <ul> vide
        let listeSousTitres = '<ul>';
        // Ajouter chaque sous-titre dans un élément <li>
        request.sousTitres.forEach(st => {
            listeSousTitres += `<li><b>${st.timestamp}</b>: ${st.texte}</li>`;
        });
        // Fermer la balise <ul>
        listeSousTitres += '</ul>';
        // Mettre à jour le contenu de l'élément pour afficher la liste
        document.getElementById("subtitles").innerHTML = listeSousTitres;
    }
});
