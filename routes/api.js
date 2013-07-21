var async = require("async");

exports.recording = function(req, res) {

  var ACCOUNT_SID = 'AC241878cc4d2f8a39a03f8bf81c697a54';
  var AUTH_TOKEN = '26ea3be8414819b3ae23d2796a14ff1e';

  var client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);


/*
  //Send an SMS text message
  client.sendSms({

      to:'+14256869787', // Any number Twilio can deliver to
      from: '+12065696973', // A number you bought from Twilio and can use for outbound communication
      // (206) 569-6973
      body: 'word to your mother.' // body of the SMS message

  }, function(err, responseData) { //this function is executed when a response is received from Twilio

      if (!err) { // "err" is an error received during the request, if any

          // "responseData" is a JavaScript object containing data received from Twilio.
          // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
          // http://www.twilio.com/docs/api/rest/sending-sms#example-1

          console.log(responseData.from); // outputs "+14506667788"
          console.log(responseData.body); // outputs "word to your mother."
          res.json({
            from: responseData.from,
            body: responseData.body});

      }
  });
*/

  var returnData = [];

  client.recordings.list(function(err, data) {

    async.forEachSeries(data.recordings, function(recording, next) {

      client.recordings(recording.sid).get(function(err, recordingData){

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