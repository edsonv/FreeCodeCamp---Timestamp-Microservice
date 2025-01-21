// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
const req = require('express/lib/request');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// My original code
// app.get('/api', (req, res) => {
//   res.json({
//     unix: Date.now(),
//     utc: new Date().toUTCString(),
//   });
// });

// your first API endpoint...
// app.get('/api/:date?', function (req, res) {
//   const { date } = req.params;

//   if (!date) {
//     return res.json({
//       unix: Date.now(),
//       utc: new Date().toUTCString(),
//     });
//   }

//   const regexGMT = /^(?:19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
//   const regexUnix = /^\d+$/;
//   const isGMT = regexGMT.test(date);
//   const isUnix = regexUnix.test(date);
//   let tmpDate;

//   let responseObj = {
//     unix: 0,
//     utc: '',
//   };

//   if (isUnix) {
//     tmpDate = new Date(parseInt(date));

//     responseObj.unix = Date.parse(tmpDate);
//     responseObj.utc = tmpDate.toUTCString();

//     return res.json(responseObj);
//   } else if (isGMT) {
//     tmpDate = new Date(date);

//     responseObj.unix = Date.parse(tmpDate);
//     responseObj.utc = tmpDate.toUTCString();

//     return res.json(responseObj);
//   } else if (new Date(date) != 'Invalid Date') {
//     tmpDate = new Date(date);

//     responseObj.unix = Date.parse(tmpDate);
//     responseObj.utc = tmpDate.toUTCString();

//     return res.json(responseObj);
//   }

//   return res.json({ error: 'Invalid Date' });
// });

app.get('/api/:date?', (req, res) => {
  const { date } = req.params;

  let parsedDate;

  // If no date is provided, use the current date
  if (!date) {
    parsedDate = new Date();
  } else if (!isNaN(date)) {
    // Handle Unix timestamp
    parsedDate = new Date(parseInt(date));
  } else {
    // Handle other date formats
    parsedDate = new Date(date);
  }

  // Validate the parsed date
  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({ error: 'Invalid Date' });
  }

  // Build response
  const responseObj = {
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  };

  return res.json(responseObj);
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
