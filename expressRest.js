var express = require('express');
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

var router = require('./mssql.js');

app.post('/api/contactSave',router.contactSave);

app.get('/api/selectUser', router.index);

app.get('/api/selectUserId/:id', router.selectUserId);

app.post('/api/insertUser',router.insertUser);

app.put('/api/updateUser/:id', router.updateUser);

app.delete('/api/deleteUser/:id', router.deleteUser);

app.listen(8000,function() {
	console.log("Listen 8000");
});