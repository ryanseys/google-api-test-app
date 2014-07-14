var express = require('express');
var router = express.Router();
var secrets = require(__dirname + '/../secrets.json');
var google = require(__dirname + '/../../google-api-nodejs-client');
var fs = require('fs');

var oauth2Client =
  new google.auth.OAuth2(
    secrets.web.client_id,
    secrets.web.client_secret,
    secrets.web.redirect_uris[0]);

/* GET home page. */
router.get('/', function(req, res) {
  var tokens = req.session.tokens;
  var title = '';
  if(tokens) {
    title = 'Access token --> ' + tokens.access_token;
  }
  else {
    title = 'Not logged in.'
  }
  res.render('index', { title: 'Google NodeJS API Client Tester: ' + title });
});

router.post('/login', function(req, res) {
  var options = {
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.appdata',
      'https://www.googleapis.com/auth/drive.apps.readonly',
      'https://www.googleapis.com/auth/drive.file'
    ].join(' ')
  };
  var generatedUrl = oauth2Client.generateAuthUrl(options);
  res.redirect(generatedUrl);
});

router.post('/uploadtest', function(req, res) {
  if(req.session.tokens) {
    var drive = google.drive({ version: 'v2', auth: oauth2Client });
    var payload = {
      resource: {
        mimeType: 'text/plain',
        title: 'wat.txt'
      },
      media: 'This file uploaded on ' + (new Date()).toString()
    };
    drive.files.insert(payload, function(err, body) {
      console.log(err, body);
      // if(!err) res.end(JSON.stringify(body));
      // else res.end(JSON.stringify(err));
    });
  }
  res.redirect('/');
});

router.post('/uploadimage', function(req, res) {
  if(req.session.tokens) {
    var drive = google.drive({ version: 'v2', auth: oauth2Client });
    var filename = 'awesome.png';

    var payload = {
      resource: {
          title: filename
      },
      media: fs.createReadStream(__dirname + '/../' + filename)
    };

    var r = drive.files.insert(payload, function(err, body) {
      console.log(err, body);
    });
  }
  res.redirect('/');
});

router.get('/oauth2callback', function(req, res) {
  var code = req.query.code;
  if(code) {
    req.session.code = code;
    oauth2Client.getToken(code, function(err, tokens) {
      req.session.tokens = tokens;
      oauth2Client.setCredentials(tokens);
      res.redirect('/');
    });
  }
  else {
    res.redirect('/');
  }
});

module.exports = router;
