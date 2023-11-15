document.getElementById('getSubtitles').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "demandeSousTitres"});
    });
  });
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "afficherSousTitres") {
      const sousTitres = request.sousTitres.map(st => `<p><b>${st.timestamp}</b>: ${st.texte}</p>`).join('');
      document.getElementById("subtitles").innerHTML = sousTitres;
    }
  });
  