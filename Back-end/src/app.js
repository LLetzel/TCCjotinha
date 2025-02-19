const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes"); // Importando as rotas

const app = express();

app.use(express.static(path.join(__dirname, '../../Front-end/src/')));


app.use(cors());
app.use(express.json()); // Para interpretar JSON no body das requisições
app.use(express.urlencoded({ extended: true })); // Para interpretar dados de formulários


// Usar as rotas definidas em routes.js
app.use("/", routes);




app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
