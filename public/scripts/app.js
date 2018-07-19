$( document ).ready(function() {

//*******************************************************************

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
            ${escape(content)}
          </div>
          <footer>
            ${timeDelta} days ago
          </footer>
        </section>
      </article>`

    return $postedTweet
  };

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  function calculateTimeSince (now, then){
    let differenceInTimeInMilliSec = now - then; // in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;
    const differenceInTime = Math.round(differenceInTimeInMilliSec/oneDay)

    return differenceInTime;
  };

  function renderTweets(tweetsArray){
    let tempStr = "";
    for (var tweet in tweetsArray){
      let tweetHTML = createTweetElement(tweetsArray[tweet]);
      $('#tweets-container').prepend(tweetHTML);
    }
  }

  $("input").click(function(event){
    const characterCount = $('#textBox').val().length;
    const maxCharaterCount = 140;

    event.preventDefault()

    if (characterCount === 0 || characterCount > maxCharaterCount){
      alert("NOPE!");
    } else {

      const serialStr = $('#form').serialize();

      $.ajax('/tweets', { method: "POST", data: serialStr })
        .then (function (data, status){
          console.log("data: ", data + "  status: ", status);
         // const tempData = createTweetElement(data);
          renderTweets([data]);
        })

        // .fail (function ())

      }
  })

  function loadTweets() {
    $.ajax("/tweets", { method: "GET" })

      .then(function (tweetsArray) {
        renderTweets(tweetsArray);
      })
      .fail(function (tweetsArray){
        console.log("MASSIVE EXPLOSIONS!!!");
      })
  }

//*******************************************************************
  loadTweets();


});// closes document ready