export default (request) => { 
    const pubnub = require('pubnub');

    const channel = "counted-words";
    const words = request.message.words;
    
    const dict = {};
    words.forEach((word) => {
       if(word in dict) {
           dict[word] += 1;
       } else {
           dict[word] = 1
       }
    });
    
    const promise = pubnub.publish({
        channel: channel,
        message: {
            "counted-words": dict
        }
    })
    .then(() => {
        return request.ok();
    })
    .catch((err) => {
        console.log(err);
    });
    
    return promise; // Return a promise when you're done 
}
