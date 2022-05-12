var mysql = require('mysql');
var express = require('express');
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"test"
});

con.connect(function(err) {
	console.log("Connected");
});

app.get('/api/selectUser', function(req, res){
	con.query("SELECT * FROM emp", function (err, result, fields) {
	    if (err) throw err;
	   	res.send(result)
	});
});

app.post('/api/insertUser', function(request, response){
	var data = [request.body.name];
	con.query(`insert into emp(name)values(?)`,data, function (err, result, fields) {
	    if (err) {
	    	response.send(err.message)
	    }else{
	    	response.send("Inserted successfully")
	    }
	});
});


app.post('/api/updateUser', function(request, response){
	var data = [request.body.name , request.body.id];
	con.query(`update emp set name=? where id=?`,data, function (err, result, fields) {
	    if (err) {
	    	response.send(err.message)
	    }else{
	    	response.send("Updateed successfully")
	    }
	});
});

app.post('/api/deleteUser', function(request, response){
	var data = [request.body.id];
	con.query(`delete from emp where id=?`,data, function (err, result, fields) {
	    if (err) {
	    	response.send(err.message)
	    }else{
	    	response.send("Deleted successfully")
	    }
	});

});

app.listen(3000);
