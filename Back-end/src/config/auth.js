module.exports = {
    secret: process.env.JWT_SECRET || 'jotinha-secret-key',
    expiresIn: '24h'
};