const mysql = require('mysql');


const express = require('express');
var app = require('express')();
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const connection = mysql.createConnection(
// 	{
// 		host     : 'localhost',
// 		user     : 'root',
// 		password : '',
// 		database : 'book_db'
// 	}); 

// connection.connect(); 

let options = {

};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public', options));

app.post('/updateFormName', function(req, res) { 
	connection.connect(function(err) {
		if (err) throw err;
		var sql = "UPDATE name SET name = 'Sam Smith' WHERE address = 'Edward Zadorozhnii'";
		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log(result.affectedRows + " record(s) updated");
		}); 
	});
});

app.get('/home.html', function(req, res) {
    res.sendFile(path.join(__dirname, 'home.html'));
});


app.get('/about.html', function(req, res) {
	res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/package.html', function(req, res) {
	res.sendFile(path.join(__dirname, 'package.html'));
});

app.get('/book.html', function(req, res) {
	res.sendFile(path.join(__dirname, 'book.html'));
});

app.get('/login.html', function(req, res) {
	res.sendFile(path.join(__dirname, 'login.html'))
});

app.post('/auth', function(request, response) {
	let username = request.body.username;
	let password = request.body.password;

	if (username && password) {
		const connectionLogin = mysql.createConnection({
			host     : 'localhost',
			user     : 'root',
			password : '',
			database : 'nodelogin'
		});
		connectionLogin.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], 
		function(error, results, fields) {
			if (error) throw error;
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.post('/data', function(req, res) {
		let name = req.body.name;
		let email = req.body.email;
		let phone = req.body.phone;
		let address = req.body.address;
		let location = req.body.location;
		let guests = req.body.guests;
		let arrivals = req.body.arrivals;
		let leaving = req.body.leaving;

		var sql = connection.query(`INSERT INTO book_form(name, email, phone, address, location, guests, arrivals, leaving) VALUES ('${name}','${email}','${phone}','${address}','${location}','${guests}','${arrivals}','${leaving}'`);
		connection.query(sql, function(err, res) {
			if (err) throw err;
			console.log('record inserted');
			req.flash('success', 'Data added');

		})
		res.redirect('book.html');
	});	

app.listen(3030);
