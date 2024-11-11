const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const server = express();
const log = console.log;
const urlencodedParser = bodyParser.urlencoded({
  extended: false,
});

server.get('/', start);
server.post('/post', urlencodedParser, post);
server.listen(3000, listen);

function start(req, res, next) {
  writeDate();
  res.sendFile(__dirname + '/index.html');
}
function post(req, res) {
  writePost(req);
  res.redirect('/');
}
function listen() {
  log('сервак слушает...')
}
function writePost(req) {
  JSON.stringify(req.body)
  let text = JSON.stringify(req.body) + '\n';
  fs.appendFileSync('post.txt', text);
}
function writeDate() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDay();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  let text = `${day}/${month}/${year} - ${hour}:${minute}:${second} \n`;
  fs.appendFileSync('log.txt', text);
}