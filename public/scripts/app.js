/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  user: {
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
}

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

  function calculateTimeSince (now, then){
    let differenceInTimeInMilliSec = now - then; // in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;
    const differenceInTime = Math.round(differenceInTimeInMilliSec/oneDay)

    return differenceInTime;
  };

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

  $('#tweets-container').append($postedTweet)

};

createTweetElement(tweetData);
