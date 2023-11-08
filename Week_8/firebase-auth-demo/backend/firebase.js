const admin = require('firebase-admin');
require("dotenv").config();

const serviceAccount = JSON.parse(process.env.SERVICE_KEY)
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://login-demo-tpeo.firebaseio.com',
    storageBucket: "gs://login-demo-tpeo.appspot.com"
});

const db = admin.firestore();
module.exports = {db};