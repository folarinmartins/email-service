const express = require('express');
const path = require('path')
const nunjucks = require('nunjucks');
require('dotenv').config();
const app = express();
const routes = require('./routes')
const nodemailer = require('nodemailer');


// const transporter = nodemailer.createTransport({
// 	service: 'gmaili',
// 	auth: {
// 		user: 'youremail@gmail.com',
// 		pass: 'yourpassword'
// 	}
// });

const smtpTransporter = nodemailer.createTransport({
	pool: true,
	host: "mail.foodres.org",
	port: 465,
	secure: true, // use TLS
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASSWORD
	}
});

// smtpTransporter.verify(function (error, success) {
// 	if (error) {
// 		console.log(error);
// 	} else {
// 		console.log("Server is ready to take our messages");
// 	}
// });


const semdmail = (mailOptions) => {
	smtpTransporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}




// app.configure(function () {
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views/fullwidth');
app.set('view engine', 'nunjucks');
// app.use(express.favicon());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.logger('dev'));
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(routes.index);
app.get('/', async (req, res, next) => {
	let data = {
		message: 'Hello world!',
		layout: 'layout.njk',
		title: 'Nunjucks example'
	}

	res.render('index.njk', data, (err, html) => {
		res.send(html);
		var mailOptions = {
			from: 'blockstale@blockstale.com',
			to: 'folarinjmartins@gmail.com',
			subject: 'Welcome - Central Mail Service',
			text: 'That was easy!',
			html,
		};
		// semdmail(mailOptions)
	})
})

app.get('/welcome', (req, res, next) => {
	res.render('download_ready.html', {}, (err, html) => { res.send(html) })
})

nunjucks.configure('views/compact', {
	autoescape: true,
	express: app,
	noCache: true
});












const server = app.listen(process.env.PORT, () => {
	let host = server.address().address;
	let port = server.address().port;
	console.log("Server listening at http://%s:%s", host, port);
})