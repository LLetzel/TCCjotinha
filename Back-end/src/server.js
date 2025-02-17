const express = require('express');
const cors = require('cors');
const carrosRoutes = require('./routes'); // Certifique-se de que esse arquivo existe

const app = express();
app.use(cors()); // Permitir requisições do frontend
app.use(express.json()); // Permitir envio de JSON
app.use('/carros', carrosRoutes); // Aqui estava o erro

const PORT = 3006;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
