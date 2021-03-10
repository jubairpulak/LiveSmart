
var admin = require("firebase-admin");

var serviceAccount = require('../config/fbServiceAccountkey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jubairfirst-dad5a.firebaseio.com"
});


module.exports = admin