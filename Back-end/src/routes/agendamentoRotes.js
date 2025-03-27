const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');

router.get('/get', agendamentoController.getAgendamentos);

router.post('/post', agendamentoController.postAgendamentos);

router.patch('/patch', agendamentoController.patchAgendamentos)

module.exports = router;
