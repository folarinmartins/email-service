
const nodemailer = require('nodemailer');


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

const verify = () => {
	smtpTransporter.verify(function (error, success) {
		if (error) {
			console.log(error);
		} else {
			console.log("Server is ready to take our messages");
		}
	});
}

const sendMail = (mailOptions) => {
	smtpTransporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ', info);
		}
	});
}

module.exports = { verify, sendMail }