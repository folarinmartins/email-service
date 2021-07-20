const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path')
const nunjucks = require('nunjucks');
const app = express();
app.use(express.json())
const routes = require('./routes')
const mailer = require('./src/mail')

var nodemailer = require('nodemailer');
// mailer.verify();

// app.configure(function () {
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/src/views/compact');
app.set('view engine', 'nunjucks');
// app.use(express.favicon());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.logger('dev'));
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(routes.index);

// var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', async (req, res, next) => {
	res.render('account_welcome.html');
})
app.post('/send', async (req, res, next) => {
	if (!req.body.recipients)
		res.status(400).send('recipients is required');

	if (req.body?.recipients.length > 0) {
		switch (req.body.type) {
			case 'account.welcome':
				req.body.recipients.forEach(recipient => {
					let data = {
						name: recipient.name,
						email: recipient.email,
						title: 'Welcome to FoodRES, Inc',
						company_email: 'foodres@foodres.org',
						company_url: 'https://www.foodres.org',
						company_name: 'FoodRES, Inc.'
					}
					res.render('account_welcome.html', data, (err, html) => {
						if (!err) {
							var mailOptions = {
								from: 'FoodRES, LLC',
								to: recipient.email,
								subject: data.title,
								text: '',
								html
							};
							mailer.sendMail(mailOptions)
						}
					})
				})
				break;
			default:
				break;
		}
		res.json({ status: 'success', message: `All mails queued PID: ${process.env.POD_ID}` })
	} else {
		res.status(400).json({ status: 'error', message: "Bad request body", data: req.body })
	}
})

app.get('/welcome', (req, res, next) => {
	res.render('account_welcome.html', {}, (err, html) => { res.send(html) })
})

nunjucks.configure('src/views/compact', {
	autoescape: true,
	express: app,
	noCache: true
});

const server = app.listen(process.env.PORT, () => {
	let host = server.address().address;
	let port = server.address().port;
	console.log("Server listening at http://%s:%s", host, port);
})