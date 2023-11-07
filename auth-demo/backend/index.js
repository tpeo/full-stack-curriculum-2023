const firebase = require("./firebase");
const express = require("express");
const app = express();
const db = firebase.db;
const cors = require('cors');
const admin = require('firebase-admin');
require("dotenv").config();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

const authMiddleware = (req, res, next) => {
    const headerToken = req.headers.authorization;
    if (!headerToken) {
      return res.status(401).send({ message: "No token provided" });
    }
  
    if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
      res.status(401).send({ message: "Invalid token" });
    }
  
    const token = headerToken.split(" ")[1];
    admin.auth()
      .verifyIdToken(token)
      .then(() => {
        // Send some important metadata to each call
        // req.username = jwtDecode(token).name;
        next();
      })
      .catch(() => res.status(403).send({ msg: "Could not authorize" }));
}

app.post('/user', async (req, res) => {
    try {
      const user = req.body.user;
      const users = await db.collection('users');

      const new_user = { name: user.name, email: user.email, id: user.user_id};

      const user_exists = (await users.doc(user.user_id).get()).exists;

      if (!user_exists) {
        const newSnapshot = await db.collection('users').doc(user.user_id).set(new_user);
        const result = await users.doc(user.user_id).get();
        return res.json({ msg: "Created a new user", data: result.data(), newUser: true });
      } else {
        const result = await users.doc(user.user_id).get();
        return res.json({ msg: "User already exists", data: result.data(), newUser: false });
      }
  
    } catch (error) {
      return res.status(400).send(`User should contain name and email`)
    }
  });

//get user info
app.get("/info/:user_id", authMiddleware, async(req, res) => {
    let uid = req.params.user_id;
    const user = db.collection("users").doc(uid);
    const query = await user.get();

    res.status(200).json(query.data());
})


app.listen(process.env["PORT"], () =>
  console.log("App listening on port " + process.env["PORT"])
);