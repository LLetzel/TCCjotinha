// controllers/multer.js
const Turma = require('../models/turma');
const path = require('path');

exports.uploadFile = async (req, res) => {
    try {
        const { codigo, descricao, inicio, fim } = req.body;

        console.log(req.body)

        if (!req.file) {
            return res.status(400).send('Nenhum arquivo enviado ou o nome do campo do formulário está incorreto.');
        }

        const fileName = '/image/' + req.file.filename;
        console.log(fileName);

        const turma = await Turma.findOne({ where: { codigo: codigo } });

        if (turma) {
            await turma.update({ fotos: fileName });
            console.log('Instância de Turma atualizada com sucesso');
        } else {
            console.log('Turma não encontrada com o código fornecido:', codigo);
        }

        const filePath = path.join('/image', req.file.filename); // Caminho relativo para o cliente
        res.json({ message: 'Arquivo enviado com sucesso!', filePath: filePath });
    } catch (error) {
        console.error('Erro ao fazer upload do arquivo:', error);
        res.status(500).send('Erro ao fazer upload do arquivo. Por favor, tente novamente.');
    }
};
