var express = require('express');
var app = express();

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/template', express.static(__dirname + '/template'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.all('/*', function(req, res, next) {
    res.sendFile('index.html', { root: __dirname });
});

app.listen(3006, function () {
  console.log('[MeuSUS Server] Server started!');
  console.log('[MeuSUS Server] Go to: http://localhost:3006/');
});
