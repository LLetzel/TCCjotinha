const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    // Define o destino das imagens
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../../../Front-end/src/imgcarros/'));
    },
    // Define o nome do arquivo
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Configuração do multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // Limite de 5MB
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        }
        cb('Erro: Apenas imagens são permitidas!');
    }
});

module.exports = upload;