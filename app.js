const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path')
const nunjucks = require('nunjucks');
const app = express();
app.use(express.json())
const routes = require('./routes')
const mailer = require('./src/mail')

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
						company_name: 'FoodRES, Inc.',
						from: 'FoodRES, Inc.'
					}

					res.render('account_welcome.html', data, (err, html) => {
						var mailOptions = {
							// from: data.from,
							to: data.email,
							subject: data.title,
							text: 'That was easy!',
							html,
						};
						mailer.sendMail(mailOptions)
					})
				})
				break;

			default:
				break;
		}
		res.json({ status: 'success', message: "all mails sent" })
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