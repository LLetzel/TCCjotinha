// ✅ Garante que o código só será executado depois que a página estiver totalmente carregada
document.addEventListener("DOMContentLoaded", function () {
  // 📅 Configurando o calendário (Flatpickr) no campo de data
  flatpickr("#date", {
    dateFormat: "d/m/Y", // Define o formato da data como dia/mês/ano
    minDate: "today", // Impede que o usuário selecione datas passadas
    disable: [
      function (date) {
        return date.getDay() === 0; // ❌ Bloqueia os domingos
      },
    ],
    locale: {
      firstDayOfWeek: 1, // 📆 Define a segunda-feira como o primeiro dia da semana
    },
  });

  // 📞 Aplicando a máscara para o campo de telefone (deixa no formato correto enquanto o usuário digita)
  $("#phone").mask("(00) 00000-0000"); // Exemplo: (11) 98765-4321

  // 📌 Captura o evento de envio do formulário
  const form = document.getElementById("appointmentForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // ❌ Impede que a página recarregue ao enviar o formulário

    // 🔄 Adiciona um efeito de carregamento no botão de envio
    const submitBtn = form.querySelector(".submit-btn");
    const originalText = submitBtn.innerHTML; // Salva o texto original do botão
    submitBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Processando...'; // Muda o botão para um estado de "carregando"
    submitBtn.disabled = true; // 🔒 Impede que o usuário clique várias vezes no botão

    // ⏳ Simula o envio do formulário (como se estivesse enviando os dados para um servidor)
    setTimeout(() => {
      // ✅ Exibe uma notificação de sucesso
      showNotification("Agendamento realizado com sucesso!");

      // 🗑️ Limpa o formulário para o próximo agendamento
      form.reset();

      // 🔄 Restaura o botão ao estado original
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 1500); // Aguarda 1.5 segundos antes de finalizar o processo
  });
});

// 🔔 Função para exibir uma notificação animada na tela
function showNotification(message) {
  const notification = document.createElement("div"); // Cria um elemento <div>
  notification.className = "notification"; // Adiciona a classe CSS de notificação
  notification.innerHTML = `
        <i class="fas fa-check-circle"></i> <!-- Ícone de sucesso -->
        <span>${message}</span> <!-- Exibe a mensagem personalizada -->
    `;

  document.body.appendChild(notification); // Adiciona a notificação ao corpo da página

  // 🎬 Adiciona a classe 'show' para fazer a notificação aparecer suavemente
  setTimeout(() => notification.classList.add("show"), 100);

  // ⏳ Remove a notificação automaticamente após 3 segundos
  setTimeout(() => {
    notification.classList.remove("show"); // Remove o efeito visual
    setTimeout(() => notification.remove(), 300); // Remove o elemento do DOM
  }, 3000);
}
