const mysql = require('mysql');

const con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: "eduquest_db"
})


export const init = () => {
	con.connect((err) => {
		if (err) throw err;
		console.log('MySQL Connected!')
	})
}

export const query = (query) => {
	con.query(query, (err, result) => {
		if (err) throw err;
		return result;
	})
}

export const createDB = (db) => {
	return query(`CREATE DATABASE ${db}`)
}

export const createTable = (table) => {
	return query(`CREATE TABLE ${table} (
		id BIGINT auto increment primary,
		name VARCHAR(255),
		email VARCHAR(255)
	)`)
}

export const insertInto = (table, valueSet) => {
	return query(`INSERT INTO ${table} (name,email) VALUES ('folarin','folarin@engineer.com')`)
}