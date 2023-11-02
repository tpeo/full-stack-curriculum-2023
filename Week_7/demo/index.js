// First run:
// npm init --yes
// npm install express
// make sure to add a .gitignore for .env and node modules

const { randomInt } = require("crypto");
// require express returns a function
const express = require("express");
// returns an object
const app = express();
const db = require("./firebase");
// for env variables
// run npm install dotenv for dependency
require("dotenv").config();
// to parse JSON in req, res
app.use(express.json());


// STEP ONE: Import required modules


// STEP TWO: Store constants for access token secret and salt



// STEP FIVE: Creating an auth middleware



// Middleware to validate tweet length
const validateTweetLength = (req, res, next) => {
  const tweet = req.body.tweet;
  if (tweet.length <= 100) {
    next(); // Tweet is valid, proceed to the next middleware or route
  } else {
    res.status(400).json({ error: "Tweet is too long (max 100 characters)." });
  }
};

// Middleware to validate input of post request
const validateInput = (req, res, next) => {
  const user = req.body.user;
  const tweet = req.body.tweet;
  if (!tweet || !user) {
    res.status(400).json({ error: "Incomplete input" });
  } else {
    next();
  }
};

app.get("/", (req, res) => {
  res.send("Hello World");
});

// get all tweets
app.get("/api/tweets", async (req, res) => {
  const doc = await db.collection("tweets").doc("tweets").get();
  res.send(doc.data().tweets);
});

// get tweets by user (param in route)
app.get("/api/tweets/:user", async (req, res) => {
  const doc = await db.collection("tweets").doc("tweets").get();
  const tweets = doc.data().tweets;
  var target = tweets.find((t) => t.user === req.params.user);
  if (!target) {
    res.status(404).send("Tweet not found");
  } else {
    res.send(target);
  }
});

// alternate get request for tweets where user is query param
// example call: http://localhost:4000/api/tweets?user=Zara
// app.get('/api/tweets', (req, res) => {
//     const user = req.query.user
//     console.log(user)
//     if (user) {
//         var target = tweets.find(t => t.user === user)
//         if (!target) {
//             res.status(404).send("Tweet not found")
//         } else {
//             res.send(target)
//         }
//     } else {
//         res.send(tweets)
//     }
// })

// post a tweet
app.post(
  "/api/tweets",
  validateInput,
  validateTweetLength,
  async (req, res) => {
    var tweet = {
      id: randomInt(200),
      user: req.body.user,
      tweet: req.body.tweet,
    };
    const tweetsRef = db.collection("tweets").doc("tweets");
    const snapshot = await tweetsRef.get();
    const currTweets = snapshot.data().tweets;
    currTweets.push(tweet);
    await tweetsRef.update({ tweets: currTweets });
    res.send(tweet);
  }
);

// delete a tweet
app.delete("/api/tweets", async (req, res) => {
  const tweetsRef = db.collection("tweets").doc("tweets");
  const snapshot = await tweetsRef.get();
  const currTweets = snapshot.data().tweets;
  const tweetIndex = currTweets.findIndex((tweet) => tweet.id === req.body.id);
  if (tweetIndex === -1) {
    res.status(404).send("Tweet not found");
  } else {
    // Remove the tweet from the 'tweets' array
    var removed = currTweets[tweetIndex];
    console.log(removed);
    currTweets.splice(tweetIndex, 1);
    await tweetsRef.update({ tweets: currTweets });
    res.json(removed);
  }
});

// STEP THREE: Create a register endpoint


// STEP FOUR: Create a login endpoint. Verifies password + creates token


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
