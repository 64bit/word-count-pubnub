# word-count-pubnub
Counts word on a webpage using Block on PubNub


# Data Flow: 

```
          |
          |
(channel:wordcount)
          |
          |
[Event Handler: download_url.js ] 
          |
          |
  (channel:page) 
          |
          |
 [Event Handler: split_page.js ] 
          |
          |
  (channel:words) 
          |
          |
[Event Handler: word_counter.js ] 
          |
          |
(channel:counted-words)
          |
         \|/
       
```
