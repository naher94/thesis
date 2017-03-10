var express = require('express');
var router = express.Router();
var convo = null;
async = require("async");
var referance = null;
var newData = null;
/* GET home page. */
var handleWatsonConvo = function (err, response) {
  if (err) console.log('error:', err);
  else {
    convo = response;
  }
}
var handleWatsonReferance = function (err, response) {
  if (err) console.log('error:', err);
  else {
    referance = response;
  }
}
var concat = function (convo, referance) {
  console.log("concat");
  for (i = 0; i < convo.length; i++) {
    for (j = 0; j < referance.length; j++) {
      if (convo[i].text == referance[j].text) {
        newData.push(referance[j]);
      }
    }
  }
}
router.get('/', function (req, res, next) {
  var watson = require('watson-developer-cloud');
  var alchemy_language = watson.alchemy_language({
    api_key: process.env.API_KEY
  })
  var parameters = {
    url: 'https://www.nytimes.com/2017/03/07/technology/uber-travis-kalanick.html?rref=collection%2Fsectioncollection%2Ftechnology&action=click&contentCollection=technology&region=rank&module=package&version=highlights&contentPlacement=1&pgtype=sectionfront'
    , showSourceText: 1
    , sentiment: 1
  };
  var parameters1 = {
    url: 'https://www.wired.com/2016/02/the-inside-story-behind-ubers-colorful-redesign/'
    , showSourceText: 1
  };
  asyncTasks = [];
  asyncTasks.push(function (parameters1, handleWatsonConvo) {
    alchemy_language.keywords(parameters1, handleWatsonConvo);
  });
  asyncTasks.push(function (parameters, handleWatsonReferance) {
    alchemy_language.keywords(parameters, handleWatsonReferance);
  });
  async.parallel(asyncTasks, function () {
    concat(convo, referance);
    res.render('index', {
      title: "Convo"
      , data: newData
    });
  });
  //  res.render('index', {
  //    title: 'Conversational Design'
  //  });
});
module.exports = router;