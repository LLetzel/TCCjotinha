const mysql2 = require('mysql2');

// Criar conexão com o pool
const pool = mysql2.createPool({
    host: '10.91.228.12',   // IP do servidor MySQL
    user: 'root',
    password: '',
    database: 'idev2_jotinhaveiculos',
    port: 3306,
    charset: 'utf8mb4',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Converter para promessas
const promisePool = pool.promise();

// Testar conexão
promisePool.getConnection()
    .then(connection => {
        console.log('✅ MySQL conectado com sucesso!');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Erro ao conectar:', {
            message: err.message,
            code: err.code,
            state: err.sqlState
        });
    });

module.exports = promisePool;
