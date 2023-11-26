const button =document.getElementById('getSubtitles')

function dsbl(){
    button.disabled = true;

    button.style.backgroundColor = 'gray';
    button.style.color = '#aaa';
    button.style.border = '3px solid #ccc';
    button.style.cursor = 'not-allowed';

    // Attendre 2 secondes (2000 millisecondes) avant de réactiver le bouton
    setTimeout(function() {
        button.disabled = false;

        button.style.backgroundColor = 'transparent';
        button.style.color = 'rgb(255, 255, 255)';
        button.style.border = '3px solid rgb(252, 70, 100)';
        button.style.cursor = 'pointer';
    }, 5000);
}


// function desactiverBoutonTemporairement() {
//     var bouton = document.getElementById('getSubtitles');
//     bouton.disabled = true;

//     // Appliquer le style spécifique au bouton désactivé
//     // bouton.style.backgroundColor = 'gray';
//     // bouton.style.color = '#aaa';
//     // bouton.style.border = '3px solid #ccc';
//     // bouton.style.cursor = 'not-allowed';


dsbl()
button.addEventListener('click', () => {
    button.remove()
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
            listeSousTitres += `<li><b>${st.timestamp}</b><p>${st.texte}</p></li>`;
        });
        // Fermer la balise <ul>
        listeSousTitres += '</ul>';
        // Mettre à jour le contenu de l'élément pour afficher la liste
        document.getElementById("subtitles").innerHTML = listeSousTitres;
    }
});

