const mysql2 = require('mysql2');

// Create connection pool
const pool = mysql2.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'idev2_jotinhaveculos',
    port: 3306,
    charset: 'utf8mb4',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Convert pool to promise-based interface
const promisePool = pool.promise();

// Test connection
promisePool.getConnection()
    .then(connection => {
        console.log('MySQL conectado com sucesso');
        connection.release();
    })
    .catch(err => {
        console.error('Erro ao conectar:', {
            message: err.message,
            code: err.code,
            state: err.sqlState
        });
    });

module.exports = promisePool;
