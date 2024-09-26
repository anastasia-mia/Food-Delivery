import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import session from "express-session";
const MySQLStore = require('express-mysql-session')(session);

dotenv.config();

const options = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

const connection = mysql.createPool(options);

const sessionStore = new MySQLStore({
    ...options,
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
});

export default connection;
export { sessionStore };