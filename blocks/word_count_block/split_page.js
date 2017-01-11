export default (request) => { 
    const pubnub = require('pubnub');
    
    const channel = 'words';
    const body = request.message.body;
    
    const re = /[^A-Za-z0-9]/
    const splits = body.split(re);
    

    const words = [];
    splits.forEach((word) => {
        if(word.trim().length > 0) {
            words.push(word);
        }
    });
    
    const promise = pubnub.fire({
       channel: channel,
       message: {
           "words": words
       }
    }).then(() => {
        return request.ok();
    }).catch((err) => {
      console.log(err);  
    })
    
    return promise;
}

/* Can't emit single words due to limit of 3 calls 

    const promises = [];
    splits.forEach((word) => {
       if(word.trim().length > 0) {
           promises.push(pubnub.fire({
               channel: channel,
               message: {
                   "word": word
               }
           }));
       } 
    });
    
    return Promise.all(promises).then(() => {return request.ok();}); 
*/
