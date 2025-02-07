const express = require('express');
// const routes = require('./routes.js');
const app = express();
const PORT = 3007;
// app.use(cookieParser());

app.use(express.json());

// app.use(routes);

app.listen(PORT, (error) => {

    if (error) {
        console.log(`Erro ao iniciar o servidor: ${error}`);
        } else {
    console.log(`Servidor está rodando na porta ${PORT}`);
    }
});



