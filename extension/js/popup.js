$(function(){
  $('#paste').click(function(){pasteSelection();});
});

$(function(){
  $('#send').click(function(){sendJSON();});
});

function pasteSelection() {
  chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 
  function(tab) {
    chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, 
    function(response){
      var text = document.getElementById('text'); 
      text.innerHTML = response.data;
    });
  });
}

function sendJSON(){
  
  let text = document.getElementById('text').value;
  const obj = {"kalimat": text};
  const myJSON = JSON.stringify(obj);

  var url = "https://f382-34-90-166-18.ngrok.io/predict";

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);

  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
     if (xhr.readyState === 4) {
        var json = JSON.parse(xhr.responseText);
        var hasil = json.Response.Label;
        console.log(xhr.responseText);
        console.log(json);
        console.log(hasil);
        //tambah untuk menampilkan hasil predict
        chrome.runtime.sendMessage( '', {
          type: 'notification',
          message: "Kalimat yang Anda kirimkan adalah "+ hasil +"!"
        });
     }};

  xhr.send(myJSON);
}
