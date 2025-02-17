const express = require('express');
const cors = require('cors');
const db = require('./config/database');
const carrosRoutes = require('./routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

// Routes
app.use('/carros', carrosRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

const PORT = 3006;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
