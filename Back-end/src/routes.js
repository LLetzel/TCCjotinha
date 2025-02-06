const express = require('express');
const app = express();

const Router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
    }); 

module.exports = router;