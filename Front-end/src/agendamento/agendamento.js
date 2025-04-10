// ✅ Garante que o código só será executado depois que a página estiver totalmente carregada
document.addEventListener("DOMContentLoaded", function () {
  flatpickr("#date", {
    dateFormat: "d/m/Y", 
    minDate: "today", 
    disable: [
      function (date) {
        return date.getDay() === 0; 
      },
    ],
    locale: {
      firstDayOfWeek: 1, 
    },
  });

  const form = document.getElementById("appointmentForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault(); 

    
    const submitBtn = form.querySelector("#agendarButton");
    const originalText = submitBtn.innerHTML; 

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...'; 
    submitBtn.disabled = true; 


    const dataInput = document.getElementById("date");
    const horaInput = document.getElementById("time");
    const interesseInput = document.getElementById("interest");
    const observacoesInput = document.getElementById("comments");

    const data = dataInput.value;
    const hora = horaInput.value;
    const interesse = interesseInput.value;
    const observacoes = observacoesInput.value;
    const userId = localStorage.getItem("userId");

    if (!data || !hora || !interesse || !userId) {
      alert("Preencha todos os campos obrigatórios.");
      
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      return;
    }

    fetch("http://localhost:3000/agendamento/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_usuario: userId,
        data: data,
        hora: hora,
        interesse: interesse,
        observacoes: observacoes,
      }),
      credentials: "include",
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        alert(data.message); 
        form.reset(); 
      } else {
        alert("Erro ao agendar. Tente novamente.");
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao conectar ao servidor. Tente novamente."); // ❌ Erro de conexão
    })
    .finally(() => {
      // 🔄 Restaura o botão ao estado original
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    });
  });
});

// 🔒 Verifica o login do usuário ao carregar a página
window.onload = async () => {
  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');

  if (!userId || userId === 'undefined' || userRole == 1 || userId == null) {
    window.location.href = '/login'; // 🚪 Redireciona para login se não estiver autenticado
  }
};
