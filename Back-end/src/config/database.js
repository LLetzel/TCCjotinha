// module.exports = {
//     dialect: 'mysql',
//     host: 'localhost',
//     username: 'root',
//     password: 'root',
//     database: 'jotinhaveiculos',
//     port: 3307,
//     define: {
//         timestamps: true,
//         underscored: true,
//     },
// };

const mysql2 = require('mysql2');

const db = mysql2.createConnection({
    host: '127.0.0.1', // Changed from localhost
    user: 'root',
    password: '',
    database: 'idev2_jotinhaveculos',
    port: 3306,
    charset: 'utf8mb4',
    connectTimeout: 10000,
    dialectOptions: {
        connectTimeout: 10000
    }
});
    db.connect((err) => {
        if (err) {
            console.error('Erro ao conectar ao MySQL:', err);
            return;
        }
        console.log('Conectado ao banco de dados MySQL!');
    });

module.exports = db;
