# word-count-pubnub
Counts word on a webpage using Block on PubNub

Demo: https://64bit.github.io/word-count-pubnub/


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

Notes:
* download_url.js publishes only 15000 characters of downloaded page as PubNub payload limit is 32K. The page is published as string and will have escaped characters making it bigger than 15K characters
* download_url.js doesn't handle 302, for example http://www.google.com won't work because it redirects to https. Similarly https://www.twitter.com doesn't work because it redirects to https://twitter.com
* split_page.js splits on any character which is not digit or alphabet, using regex: `/[^A-Za-z0-9]/`

