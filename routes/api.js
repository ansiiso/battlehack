var async = require("async");
var paypal_sdk = require('paypal-rest-sdk');
var ACCOUNT_SID = 'AC241878cc4d2f8a39a03f8bf81c697a54';
var AUTH_TOKEN = '26ea3be8414819b3ae23d2796a14ff1e';
var twilioClient = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);


exports.recording = function(req, res) {

  var returnData = [];

  twilioClient.recordings.list(function(err, data) {

    async.forEachSeries(data.recordings, function(recording, next) {

      twilioClient.recordings(recording.sid).get(function(err, recordingData){

        returnData.push({
          create: recordingData.date_created,
          voice: 'https://api.twilio.com' + recordingData.uri.replace('.json', '.mp3')
        });
        next();
      });
      
    }, function(err) {
      res.json(returnData);
    });

  });
};

exports.remove = function(req, res) {

  var returnData = [];

  twilioClient.recordings.list(function(err, data) {

    async.forEachSeries(data.recordings, function(recording, next) {

      twilioClient.recordings(recording.sid).delete(function(err, recordingData){
        next();
      });
      
    }, function(err) {
      res.json('done');
    });

  });

};

exports.payments = function(req, res) {

  function keyValue(obj, key, label) {
    var returnValue = '';
    if(obj && obj.hasOwnProperty(key))
      returnValue = (label || key) + ': ' + obj[key];
    return returnValue;
  }

  var resp = new require('twilio').TwimlResponse();

  var voiceSetting = {
      voice:'woman',
      language:'en'
  };

  resp.say('Hello Soldier, Here are your recent paypal transactions.', voiceSetting);

  paypal_sdk.configure({
    'host': 'api.sandbox.paypal.com',
    'port': '',
    'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
    'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
  });

  var listPayment = {
      'count': '1',
      'start_index': '1'
  };

  paypal_sdk.payment.list(listPayment, function (error, data) {
    if (error) {
        throw error;
    } else {

        data.payments.forEach(function(payment, index) {
          resp.say('Payment number : ' + payment.id, voiceSetting);

          resp.say(keyValue(payment, 'intent'), voiceSetting);

          resp.say(keyValue(payment.payer, 'payment_method', 'payment method'), voiceSetting);

          payment.transactions.forEach(function(transaction, index) { 

            resp.say(keyValue(transaction, 'description', 'transaction description'), voiceSetting);
            resp.say('Amount detail', voiceSetting);
            resp.say('Total: ' + transaction.amount.total + ' ' + transaction.amount.currency, voiceSetting);

          });

        });
        
        res.setHeader('content-type', 'application/xml');
        res.end(resp.toString());
    }
  });

};

