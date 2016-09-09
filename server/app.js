var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var favorites = require('./routes/favorites');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, './public')));

app.use('/favorites', favorites);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

app.set('port', 3000);

app.listen(process.env.PORT || app.get('port'), function () {
  console.log('Listening on port: ', app.get('port'));
});
