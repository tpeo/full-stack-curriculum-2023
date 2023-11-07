const { randomInt } = require("crypto");
const express = require("express");
const app = express();
const db = require("./firebase");
require("dotenv").config();
app.use(express.json());

// STEP ONE: Import required modules
// package used for hashing
const pbkdf2 = require("pbkdf2");
// package to sign JWTs
const jwt = require("jsonwebtoken");

// STEP TWO: Store constants for access token secret and salt
// secret key used to sign and verify JWT tokens
ACCESS_TOKEN_SECRET = "abc123";
// random string used as an additional input
const SALT = ";asf;klsadfllsfjalskdfjl";

// STEP FIVE: Creating an auth middleware
// Auth Middleware for non expired tokens (check validity of token sent in)
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

const validateTweetLength = (req, res, next) => {
  const tweet = req.body.tweet;
  if (tweet.length <= 100) {
    next();
  } else {
    res.status(400).json({ error: "Tweet is too long (max 100 characters)." });
  }
};

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

app.get("/api/tweets", async (req, res) => {
  const doc = await db.collection("tweets").doc("tweets").get();
  res.send(doc.data().tweets);
});

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

app.delete("/api/tweets", async (req, res) => {
  const tweetsRef = db.collection("tweets").doc("tweets");
  const snapshot = await tweetsRef.get();
  const currTweets = snapshot.data().tweets;
  const tweetIndex = currTweets.findIndex((tweet) => tweet.id === req.body.id);
  if (tweetIndex === -1) {
    res.status(404).send("Tweet not found");
  } else {
    var removed = currTweets[tweetIndex];
    console.log(removed);
    currTweets.splice(tweetIndex, 1);
    await tweetsRef.update({ tweets: currTweets });
    res.json(removed);
  }
});

// STEP THREE POINT FIVE: Hash a password function using PBKDF2
const hashPassword = (password) => {
  // Use PBKDF2 with a specific number of iterations, a key length, and a hashing algorithm (e.g., SHA-512)
  const key = pbkdf2.pbkdf2Sync(password, SALT, 1000, 64, "sha512");
  return key.toString("hex"); // Converting hash to a hexadecimal string
};

// STEP THREE: Create a register endpoint
app.post("/register", async (req, res) => {

  const { username, password } = req.body;
  // hash the password - this is what we store in the database!
  const passHashed = hashPassword(password);
  // simple check for duplicate users
  const check = await db.collection("users").doc(username).get();
  if (check.exists) {
    return res.status(400).json({ msg: "User exists" });
  }
  // create new user
  const user = {
    username: username,
    password: passHashed,
  };
  console.log(user);
  // add new user to DB
  const usersRef = db.collection("users");
  await usersRef.doc(username).set(user);
  // create new access token
  // set expiry to 30s so you can show them how it expires when call route
  const accessToken = jwt.sign({ username: username }, ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });
  // Send JWT Token back
  res.json({
    msg: "successfully created",
    data: { username: username },
    token: accessToken,
  });
});

// STEP FOUR: Create a login endpoint. Verifies password + creates token
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const passHashed = hashPassword(password);
  // Get the user
  const check = await db.collection("users").doc(username).get();
  // CHANGE! Check if user exists
  if (!check.exists) {
    return res.status(400).json({ msg: "User does not exist" });
  }
  // Cross reference the stored password with the incoming password (hashed)
  const user = check.data();
  let samePassword = passHashed === user.password;
  if (samePassword) {
    // user logged in correctly
    const accessToken = jwt.sign({ username: username }, ACCESS_TOKEN_SECRET, {
      expiresIn: "30s",
    });
    return res.json({
      msg: "successfully logged in",
      data: { username: username },
      token: accessToken,
    });
  } else {
    return res.status(401).json({ msg: "Username or password was incorrect" });
  }
});

// Example of a protected route - run so they can see
app.get("/protected", authMiddleware, (req, res) => {
  res.send("User " + req.user + " was authenticated");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));