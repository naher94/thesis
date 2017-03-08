var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  
  var watson = require('watson-developer-cloud');
  var alchemy_language = watson.alchemy_language({
    api_key: 'API_KEY'
  })
  var parameters = {
    url: 'http://www.twitter.com/ibmwatson'
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