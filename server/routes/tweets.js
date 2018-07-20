"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {

    DataHelpers.getTweets((err, tweets) => {
      if (err) {

        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    // -- the ? conditional operator on req.body.user  -- in this example, if "true", user = req.body.user -- if false, user = req.body.user : userHelper.generateRandomUser()
    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      // Date.now returns with the number of milliseconds from Jan 1, 1970 0h00:00
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });

    res.json(tweet);
  });

  return tweetsRoutes;

}
