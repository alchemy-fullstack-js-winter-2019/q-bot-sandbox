require('dotenv').config();
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const { helloSlackHandler } = require('./handlers/helloSlack');
const { processQuestionHandler } = require('./handlers/processQuestion');
const { saveChannelNameHandler } = require('./handlers/saveSlackChannelName');
const { saveCohortNameHandler } = require('./handlers/saveCohortName');

admin.initializeApp();

exports.helloSlack = functions.https.onRequest(helloSlackHandler(admin));

exports.processQuestion = functions.firestore.document('question/{id}').onCreate(processQuestionHandler(admin));

exports.saveChannelName = functions.firestore.document('question/{id}').onCreate(saveChannelNameHandler(admin));

exports.saveCohortName = functions.firestore.document('cohort/{id}').onCreate(saveCohortNameHandler(admin));
