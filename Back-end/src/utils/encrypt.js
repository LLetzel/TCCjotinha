const bcrypt = require('bcrypt')

const salt = 14;

module.exports.encrypting = async (password) =>{
    const saltGenerated = await bcrypt.genSalt(salt);
    return await bcrypt.hash(password, saltGenerated)
}

module.exports.verifyEncrypt = async (password, hashed) => {
    try {
        const isMatch = await bcrypt.compare(password, hashed);
        return isMatch;
    } catch (err) {
        console.error("Erro ao verificar a senha:", err);
        return false;
    }
}