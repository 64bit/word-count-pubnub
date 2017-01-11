
var config = {
  ssl: true,
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

function sorted_words(word_count_dict) {
  var pairs = [];
  for(key in word_count_dict) 
    pairs.push([key, word_count_dict[key]]);

  pairs.sort(function(p1, p2) {
    count1 = p1[1];
    count2 = p2[1];
    if(count1 < count2)
      return -1;
    else if(count1 > count2)
      return 1
    return 0;
  });

  return pairs;
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
        var words_with_count = sorted_words(words);
        for(i = 0 ; i < words_with_count.length; ++i) { 
          var row = table.insertRow(0);
          var cell_one = row.insertCell(0);
          var cell_two = row.insertCell(1);
          cell_one.innerHTML = words_with_count[i][0];
          cell_two.innerHTML = words_with_count[i][1];  
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

