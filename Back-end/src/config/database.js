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

const mysql2 = require(mysql2);

const ConexaoDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'jotinhaveiculos',
    port: 3307
    });
    connection.connect((err) => {
        if (err) {
            console.log(`Erro ao conectar no banco de dados: ${err}`);
        } else {
            console.log('Conectado ao banco de dados com sucesso!');
        }
        });

module.exports = ConexaoDB;
