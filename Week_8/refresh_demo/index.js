const { randomInt } = require('crypto');
// require express returns a function
const express = require('express');

// returns an object
const app = express();
const db = require('./firebase')

// for hashing
var pbkdf2 = require('pbkdf2')
// JWT 
const jwt = require('jsonwebtoken');
// store in env, ok here for demo
ACCESS_TOKEN_SECRET = "abc123"
REFRESH_TOKEN_SECRET = "123abc"
const SALT = ";asf;klsadfllsfjalskdfjl";
let refreshTokens = []

// for env variables
// run npm install dotenv for dependency
require('dotenv').config()

// to parse JSON in req, res
app.use(express.json())

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
    const user = req.user;
    const tweet = req.body.tweet;
    if (!tweet || !user) {
        res.status(400).json({ error: 'Incomplete input' });
    } else {
        next();
    }
  };

  // Auth Middleware for non expiring tokens (check validity of token sent in)
function authMiddleware(req, res, next) {
  // Check if proper header exists
  if (req.headers["authorization"]) {
    // Split on space -> should return ["Bearer", "${token}"]
    const headers = req.headers["authorization"].split(" ");
    // Check if first argument is Bearer
    if (headers.length === 2 && headers[0] === "Bearer") {
      let token = headers[1];
      try {
        // verify the token
        let decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
        // Set user object which can be accessed in the req in future
        req.user = decodedToken.username;
        next(); // Go to next function
      } catch (e) {
        return res.status(401).json({ msg: e.message });
      }
    } else {
      return res.status(401).json({ msg: "invalid token" });
    }
  } else {
    return res.status(401).json({ msg: "token was not found in header" });
  }
}


app.get('/', (req, res) => {
    res.send('Hello World')
})

// get all tweets
app.get('/api/tweets', authMiddleware, async (req, res) => {
    const doc = await db.collection("tweets").doc("tweets").get();
    res.send(doc.data().tweets)
})

// get tweets by user (param in route)
app.get('/api/tweets/:user', authMiddleware, async (req, res) => {
    const doc = await db.collection("tweets").doc("tweets").get();
    const tweets = doc.data().tweets;
    var target = tweets.find(t => t.user === req.user)
    if (!target) {
        res.status(404).send("Tweet not found")
    } else {
        res.send(target)
    }
})

// post a tweet
app.post('/api/tweets', authMiddleware, validateInput, validateTweetLength, async (req, res) => {
    var tweet = {
        id: randomInt(1000),
        user: req.user,
        tweet: req.body.tweet
    }
    const tweetsRef = db.collection("tweets").doc("tweets");
    const snapshot = await tweetsRef.get();
    const currTweets = snapshot.data().tweets;
    currTweets.push(tweet)
    await tweetsRef.update({tweets: currTweets})
    res.send(tweet)
})

// delete a tweet
app.delete('/api/tweets', authMiddleware, async (req, res) => {
    const tweetsRef = db.collection("tweets").doc("tweets");
    const snapshot = await tweetsRef.get();
    const currTweets = snapshot.data().tweets;
    const tweetIndex = currTweets.findIndex(tweet => tweet.id === req.body.id);
    if (tweetIndex === -1) {
        res.status(404).send("Tweet not found");
      } else {
        // Remove the tweet from the 'tweets' array
        var removed = currTweets[tweetIndex]
        console.log(removed)
        currTweets.splice(tweetIndex, 1);
        await tweetsRef.update({tweets: currTweets})
        res.json(removed);
      }
})

// Hash a password function using PBKDF2
const hashPassword = (password) => {
  const key = pbkdf2.pbkdf2Sync(password, SALT, 1000, 64, 'sha512');
  return key.toString('hex');
};

// Creates a user with password, no checks needed
app.post("/register", async (req, res) => {
  // Get the username and password from request
  const { username, password } = req.body;
  // hash the password - this is what we want to store in db
  const passHashed = hashPassword(password)
  // Check for duplicate users
  const check = await db.collection("users").doc(username).get();
  if (check.exists) {
    return res.status(400).json({ msg: "User exists" });
  }
  // create new user
  const user = {
    username: username,
    password: passHashed
  }
console.log(user)
// add new user to DB
  const usersRef = db.collection('users');
  await usersRef.doc(username).set(user);
// create new access token
// set expiry to 30s so you can show how it expires when call route
  const accessToken = jwt.sign(
    { "username": username },
    ACCESS_TOKEN_SECRET,
    { expiresIn: '15s' }
  );  
  // Send JWT Token back
  res.json({
    msg: "successfully created",
    data: { username: username },
    token: accessToken,
  });
});

// Verifies password + creates token
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const passHashed = hashPassword(password);
  // Get the user
  const check = await db.collection("users").doc(username).get();
  // Check if user exists
  if (!check.exists) {
    return res.status(400).json({ msg: "User does not exist" });
  }
  // Cross reference the stored password with the incoming password (hashed)
  const user = check.data();
  let samePassword = passHashed === user.password;
  if (samePassword) {
    // user logged in correctly
    const accessToken = jwt.sign(
      { "username": username },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '15s' }
    );
    const refreshToken = jwt.sign(
      { "username": username },
      REFRESH_TOKEN_SECRET
    );
    refreshTokens.push(refreshToken)
    return res.json({
      msg: "successfully logged in",
      data: { username: username },
      token: accessToken,
      refresh_token: refreshToken
    });
  } else {
    return res.status(401).json({ msg: "Username or password was incorrect" });
  }
});

app.post('/refreshToken', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  // check if refresh token is valid
  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(401)
  }
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.send(401)
    const accessToken = jwt.sign(
      { "username": user.username },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '15s' }
    );
    res.json({accessToken: accessToken})
  })
})

app.delete('/logout', (req, res) => {
  token = req.body.token
  refreshTokens = refreshTokens.filter(tok => tok !== token)
  res.sendStatus(204)
})

// Example of a protected route
app.get("/protected", authMiddleware, (req, res) => {
  res.send("User " + req.user + " was authenticated");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))