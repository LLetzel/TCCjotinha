// ✅ Garante que o código só será executado depois que a página estiver totalmente carregada
document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        Swal.fire({
            icon: "error",
            title: "Acesso negado",
            text: "Você precisa estar logado para acessar esta página.",
            background: "rgba(0, 0, 0, 1)",
            color: "#F6F6F6",
        }).then(() => {
            window.location.href = '/login';
        });
    }
  flatpickr("#date", {
    dateFormat: "Y-m-d", // d/m/Y
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

    const API_BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:3000"
  : "https://jotinha2-hdecesc2cba3b9bg.brazilsouth-01.azurewebsites.net";
    const dataInput = document.getElementById("date");
    const horaInput = document.getElementById("time");
    const interesseInput = document.getElementById("interest");
    const observacoesInput = document.getElementById("comments");

    const data = dataInput.value;
    const hora = horaInput.value;
    const interesse = interesseInput.value;
    const observacoes = observacoesInput.value;
    const userId = localStorage.getItem("userId");
    const email = JSON.parse(localStorage.getItem("user")).email;

    if (!data || !hora || !interesse || !userId) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: 'Preencha todos os campos obrigatórios.',
        showConfirmButton: false,
        timer: 1500,
        background: "rgb(51, 48, 48)", // --background-dark
        color: "#F6F6F6", // --text-color
      })

      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      return;
    }

    fetch(`${API_BASE_URL}/agendamento/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({
        id_usuario: userId,
        email: email,
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
          Swal.fire({
            position: "center",
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 2000,
            background: "rgba(0, 0, 0, 1)", // --background-dark
            color: "#F6F6F6", // --text-color
            customClass: {
              popup: 'swal-border-red'   // classe personalizada
            }
          });
          form.reset();
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Erro ao agendar. Tente novamente.",
            background: "rgba(0, 0, 0, 1)",
            color: "#F6F6F6",
            customClass: {
              popup: 'swal-border-red'
            }
          });
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Erro ao conectar ao servidor. Tente novamente.",

          background: "rgba(0, 0, 0, 1)",
          color: "#F6F6F6",
          iconColor: "#c9302c",
          customClass: {
            popup: 'swal-border-red'
          }
        });
      })
      .finally(() => {
        // 🔄 Restaura o botão ao estado original
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      });
  });
});

