const twilio = require('twilio');

// Put below info in a separate file and import them in this file
// Put that file in the gitIgnore so that it does not push these information to the git
const accountSid = 'ACfddcf09cfcaa976cf4fbc6fc5fa3fac5';
const authToken = '2615afff18832122330cba5ea45801e5';

module.exports = new twilio.Twilio(accountSid, authToken);