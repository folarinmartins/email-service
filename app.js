const express = require('express');
const path = require('path')
const nunjucks = require('nunjucks');
require('dotenv').config();
const app = express();
const routes = require('./routes')

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

	res.render('index.njk', data)
})

app.get('/welcome', (req, res, next) => {
	res.render('download_ready.html')
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