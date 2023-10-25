// First run: 
// npm init --yes
// npm install express

// make sure to add a .gitignore for .env and node modules

// require express returns a function
const express = require('express');
// returns an object
const app = express();

// for env variables
// run npm install dotenv for dependency
require('dotenv').config()

// to parse JSON in req, res
app.use(express.json())

// fake database
const tweets = [
    {id: 1, user:'Zara', tweet:"Hello"},
    {id: 2, user: 'Emerald', tweet:"World"}
]

// Middleware to validate tweet length
const validateTweetLength = (req, res, next) => {
    const tweet = req.body.tweet;
    if (tweet.length <= 100) {
      next(); // Tweet is valid, proceed to the next middleware or route
    } else {
      res.status(400).json({ error: 'Tweet is too long (max 100 characters).' });
    }
  };

  // Middleware to validate input of post request
  const validateInput = (req, res, next) => {
    const user = req.body.user;
    const tweet = req.body.tweet;
    if (!tweet || !user) {
        res.status(400).json({ error: 'Incomplete input' });
    } else {
        next();
    }
  };


app.get('/', (req, res) => {
    res.send('Hello World')
})

// get all tweets
app.get('/api/tweets', (req, res) => {
    res.send(tweets)
})

// get tweets by user (param in route)
app.get('/api/tweets/:user', (req, res) => {
    var target = tweets.find(t => t.user === req.params.user)
    if (!target) {
        res.status(404).send("Tweet not found")
    } else {
        res.send(target)
    }
})

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
app.post('/api/tweets', validateInput, validateTweetLength, (req, res) => {
    var tweet = {
        id: tweets.length + 1,
        user: req.body.user,
        tweet: req.body.tweet
    }
    tweets.push(tweet)
    res.send(tweet)
})

// delete a tweet
app.delete('/api/tweets', (req, res) => {
    const tweetIndex = tweets.findIndex(tweet => tweet.id === req.body.id);
    if (tweetIndex === -1) {
        res.status(404).send("Tweet not found");
      } else {
        // Remove the tweet from the 'tweets' array
        var removed = tweets[tweetIndex]
        console.log(removed)
        tweets.splice(tweetIndex, 1);
        res.json(removed);
      }
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))
