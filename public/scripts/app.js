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
    const timeDelta =         timeUnitMaker(currentTime, createdAt);

    const $postedTweet =
      `<article class="posted-tweet">
        <section>
          <header>
            <img src=${userAvatarSmall}>
            <p class="userName">${userName}</p>
            <p class="userHandle">${userHandle}</p>
          </header>
          <div>
            ${escape(content)}
          </div>
          <footer>
            ${timeDelta}
            <span>
              <i class="far fa-heart"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-share"></i>
            </span>
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

  function timeUnitMaker (now, then) {
    const timeElasped = now - then;
    const timeUnitObj = {week: 604800000, day: 86400000, hour: 3600000,minute: 60000, second: 1000,};
    let timeUnitName = "";
    let timeUnitDenominator;

    for (unit in timeUnitObj){
      if (timeElasped > timeUnitObj[unit]){
        timeUnitName = unit;
        timeUnitDenominator = timeUnitObj[unit];
        break;
      }
    }

    const formattedTime = Math.round(timeElasped / timeUnitDenominator);

    if (formattedTime > 1){
      timeUnitName = timeUnitName + "s"
    }

    const returnStr = "posted " + formattedTime + " " + timeUnitName + " ago"
    return returnStr;
  };

  function renderTweets(tweetsArray){
    let tempStr = "";
    for (var tweet in tweetsArray){
      let tweetHTML = createTweetElement(tweetsArray[tweet]);
      $('#tweets-container').prepend(tweetHTML);
    }
  }

// listens for input click then checks to see if text length is more than 0 and less than max count
// if satisfied, serializes string, and POSTs string to /tweets
// sends the returning data array to function renderTweets
  $("input").click(function(event){
    const characterCount = $('#textBox').val().length;
    const maxCharaterCount = 140;

    event.preventDefault()

    if (characterCount === 0 || characterCount > maxCharaterCount){
      $(".new-tweet footer div").slideDown("slow");
    } else {

      $(".new-tweet footer div").hide();

      const serialStr = $('#form').serialize();

      $.ajax('/tweets', { method: "POST", data: serialStr })
        .then (function (data, status){
          renderTweets([data]);
        })
      }
  })

  // initializes the hiding of the tweet composition box
  $(".new-tweet").hide();

  // initializes the hiding of the error message
  $(".new-tweet footer div").hide();

  // slow animates the new-tweet box when the compose button is clicked
  $(".composeButton").click(function(event){
    $(".new-tweet").toggle("slow");
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

});