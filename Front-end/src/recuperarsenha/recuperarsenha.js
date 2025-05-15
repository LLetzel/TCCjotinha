const emailInput = document.getElementById('email');
const enviarBtn = document.getElementById('enviarEmailBtn');
const senhaInput = document.getElementById('novaSenha');
const alterarBtn = document.getElementById('alterarSenhaBtn');

emailInput?.addEventListener('input', () => {
  enviarBtn.disabled = !emailInput.value.includes('@');
});

senhaInput?.addEventListener('input', () => {
  alterarBtn.disabled = !senhaInput.value;
});

enviarBtn?.addEventListener('click', enviarEmail);
alterarBtn?.addEventListener('click', confirmarSenha);

// Detectar token na URL
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

if (token) {
  document.getElementById('etapaEmail').classList.add('hidden');
  document.getElementById('etapaSenha').classList.remove('hidden');
}

async function enviarEmail() {
  try {
    const email = emailInput.value;
    await axios.post('/recuperar/email', { email });

    await Swal.fire({
      position: "center",
      icon: "success",
      title: 'Link enviado!',
      text: 'Verifique seu e-mail.',
      confirmButtonText: 'OK',
      background: "rgba(0, 0, 0, 1)",
      color: "#F6F6F6",
  })
  } catch (err) {
    await Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: err.response?.data?.mensagem || 'Erro ao enviar e-mail.',
      confirmButtonText: 'OK',
      background: "rgba(0, 0, 0, 1)",
      color: "#F6F6F6",
    });
  }
}

async function confirmarSenha() {
  try {
    const novaSenha = senhaInput.value;
    await axios.post('/recuperar/redefinir', { token, novaSenha });

    await Swal.fire({
      icon: 'success',
      title: 'Senha redefinida!',
      text: 'Você já pode fazer login.',
      confirmButtonText: 'OK',
      background: "rgba(0, 0, 0, 1)",
      color: "#F6F6F6",
    });

    window.location.href = '/login';
  } catch (err) {
    await Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: err.response?.data?.mensagem || 'Erro ao redefinir senha.',
      confirmButtonText: 'OK',
      background: "rgba(0, 0, 0, 1)",
      color: "#F6F6F6",
    });
  }
}