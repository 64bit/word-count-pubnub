
var config = {
  publish_key: 'pub-c-c68393a7-4def-44c9-b976-ce3edca2384a',
  subscribe_key: 'sub-c-76c62aec-d6f1-11e6-b72f-02ee2ddab7fe'
}


var output_channel = 'counted-words';
var publish_channel = 'wordcount';
var pubnub = new PUBNUB(config);

function submit() {
  var url = document.getElementById('url').value;
  var url = url.trim();
  word_count(url);
  return true;
}

function word_count(url) {
  pubnub.publish({
    channel: publish_channel,
    message: {
      url: url
    }
  });
}

pubnub.subscribe({
    channel : output_channel,
    message : function( message, env, channel ){
        console.log(message)
        var table = document.getElementById('table');
        while (table.hasChildNodes()) {
          table.removeChild(table.lastChild);
        }
      
        var words = message['counted-words'];
        for(word in words) { 
          var row = table.insertRow(0);
          var cell_one = row.insertCell(0);
          var cell_two = row.insertCell(1);
          cell_one.innerHTML = word;
          cell_two.innerHTML = words[word];  
        }
    },
    connect : function(){
        console.log("Connected")
    },
    disconnect : function(){
        console.log("Disconnected")
    },
    reconnect : function(){
        console.log("Reconnected")
    },
    error : function(){
        console.log("Network Error")
    }, 
})

