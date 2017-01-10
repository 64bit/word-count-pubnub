export default (request) => { 
    const pubnub = require('pubnub');
    const kvstore = require('kvstore');
    const xhr = require('xhr');

    const MAX_PAGE_SIZE = 15000;
    const channel = 'page';
    const url = request.message.url;
    console.log(url);
    
    return xhr.fetch(url)
    .then((response) => {
        console.log("Got Response!");
        const body = response.body.substring(0, MAX_PAGE_SIZE);
        return pubnub.fire({
           channel: channel,
           message: {
               "body": body
           }
        }); 
    })
    .then((published) => {
        console.log("published");
        return request.ok();
    })
    .catch((err) => {
       console.log(err);
       return err;
    });
}
