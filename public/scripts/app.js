/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
]


function createTweetElement (dataObj) {

  const userName =          dataObj.user.name;
  const userAvatarSmall =   dataObj.user.avatars.small;
  const userAvatarRegular = dataObj.user.avatars.regular;
  const userAvatarLarge =   dataObj.user.avatars.large;
  const userHandle =        dataObj.user.handle;
  const content =           dataObj.content.text;
  const createdAt =         dataObj.created_at;
  let   currentTime =       Date.now();
  const timeDelta =         calculateTimeSince(currentTime, createdAt);


  const $postedTweet =
    `<article class="posted-tweet">
      <section>
        <header>
          <img src=${userAvatarSmall}>
          ${userName}
          <p class="userHandle">
          ${userHandle}
          </p>
        </header>
        <div>
          ${content}
        </div>
        <footer>
          ${timeDelta} days ago
        </footer>
      </section>
    </article>`


  return $postedTweet
  // $('#tweets-container').append($postedTweet)

};

function calculateTimeSince (now, then){
  let differenceInTimeInMilliSec = now - then; // in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;
  const differenceInTime = Math.round(differenceInTimeInMilliSec/oneDay)

  return differenceInTime;
};


// takes JSON formatted array of tweets and creates a string that is formatted for appending in HTML
// function postedTweetsStringMaker(tweetsArray){

//   let masterTweetString = "";

//   for(let i = 0; i < tweetsArray.length; i++){
//     let $postedTweet = createTweetElement(tweetsArray[i]);

//     console.log(masterTweetString.concat($postedTweet, masterTweetString));

//   }

//   return masterTweetString; //
// };

function renderTweets(tweetsArray){

  let tempStr = "";
  console.log("tweetsArray[0]: " + tweetsArray[0])

  for (var tweet in tweetsArray){

    let tweetHTML = createTweetElement(tweetsArray[tweet]);
    $('#tweets-container').append(tweetHTML);

  }
}
// loop through tweets array
// each objs gen HTML - call createTweetElement
// store to var
// append var to tweet container
// end of loop


renderTweets(tweetData);

// $('#tweets-container').append(postedTweetsStringMaker(tweetData));
