const nodemailer = require('nodemailer');

exports.sendPasswordResetEmail = async (to, link) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Redefinição de senha - Jotinha veículos',
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #e0e0e0;">
      
      <!-- Cabeçalho -->
      <div style="background-color: #161616; padding: 20px; display: flex; align-items: center;">
        <img src=cid:logo">
        <h2 style="color: #ffffff; margin: 0; font-size: 22px;">Redefinir sua senha</h2>
      </div>

      <!-- Linha vermelha -->
      <div style="background-color: #A71313; height: 5px;"></div>

      <!-- Corpo -->
      <div style="padding: 30px; color: #161616;">
        <p style="font-size: 16px; margin-bottom: 15px;">Olá,</p>
        <p style="font-size: 15px; margin-bottom: 25px;">
          Recebemos uma solicitação para redefinir sua senha no <strong>jotinhaveiculos.com</strong>. Para continuar, clique no botão abaixo:
        </p>

        <div style="text-align: center; margin-bottom: 30px;">
          <a href="${link}" 
            style="
              display: inline-block;
              background-color: #A71313;
              color: white;
              padding: 14px 28px;
              border-radius: 6px;
              font-size: 16px;
              font-weight: bold;
              text-decoration: none;
              transition: background 0.3s ease;
            ">
            Redefinir Senha
          </a>
        </div>

        <p style="font-size: 14px; color: #333; line-height: 1.5;">
          Se você não solicitou essa alteração, apenas ignore este e-mail. Nenhuma ação será tomada.
        </p>

        <div style="margin-top: 30px; font-size: 13px; color: #555;">
          <p style="margin-bottom: 5px;">Caso o botão não funcione, copie e cole o link abaixo no seu navegador:</p>
          <a href="${link}" style="color: #A71313; word-break: break-all;">${link}</a>
        </div>
      </div>

      <!-- Rodapé -->
      <div style="background-color: #f2f2f2; text-align: center; padding: 20px; font-size: 12px; color: #888;">
        © 2024 Jotinha Veículos · Todos os direitos reservados
      </div>
    </div>
    `
  };

  await transporter.sendMail(mailOptions);
};
