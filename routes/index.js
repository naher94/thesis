var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  
  var watson = require('watson-developer-cloud');
  var alchemy_language = watson.alchemy_language({
    api_key: process.env.API_KEY
  })
  var parameters = {
    url: 'https://www.nytimes.com/2017/03/07/technology/uber-travis-kalanick.html?rref=collection%2Fsectioncollection%2Ftechnology&action=click&contentCollection=technology&region=rank&module=package&version=highlights&contentPlacement=1&pgtype=sectionfront'
  };
  alchemy_language.keywords(parameters, function (err, response) {
    if (err) console.log('error:', err);
    else console.log(JSON.stringify(response, null, 2));
  });
  
  res.render('index', {
    title: 'Conversational Design'
  });
});
module.exports = router;