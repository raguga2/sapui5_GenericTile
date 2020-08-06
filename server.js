var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(__dirname));
app.get('/', function(req, res) {
  res.sendfile('index.html');
});
app.listen(3221);
console.log('Сервер запущен по адресу: http://localhost:3221/');