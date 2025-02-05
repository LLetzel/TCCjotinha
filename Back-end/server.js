const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./src/routes/users'));
app.use('/api/cars', require('./src/routes/cars'));
app.use('/api/appointments', require('./src/routes/appointments'));
app.use('/api/proposals', require('./src/routes/proposals'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));