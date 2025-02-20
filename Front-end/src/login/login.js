document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");
  const inputs = form.querySelectorAll("input");

  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateInput(input));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateForm()) {
      const submitBtn = form.querySelector(".submit-btn");
      submitBtn.classList.add("loading");
      // Simulate API call
      setTimeout(() => {
        submitBtn.classList.remove("loading");
        // Handle login success
      }, 2000);
    }
  });
});

function validateInput(input) {
  const wrapper = input.closest(".input-wrapper");
  const errorMessage = wrapper.querySelector(".error-message");

  if (input.type === "email") {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
    updateValidation(wrapper, valid, "Email inválido");
  }

  if (input.type === "password") {
    const valid = input.value.length >= 6;
    updateValidation(wrapper, valid, "Senha deve ter no mínimo 6 caracteres");
  }
}

function updateValidation(wrapper, valid, message) {
  wrapper.classList.remove("error", "success");
  wrapper.classList.add(valid ? "success" : "error");
  const errorMessage = wrapper.querySelector(".error-message");
  if (errorMessage) {
    errorMessage.textContent = message;
    errorMessage.classList.toggle("visible", !valid);
  }
}

function validateForm() {
  let valid = true;
  const inputs = document.querySelectorAll("input[required]");
  inputs.forEach((input) => {
    validateInput(input);
    if (input.closest(".input-wrapper").classList.contains("error")) {
      valid = false;
    }
  });
  return valid;
}

const togglePassword = document.querySelector(".toggle-password");
const passwordInput = document.querySelector("#senha");

togglePassword.addEventListener("click", function () {
  // Toggle password visibility
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    this.classList.remove("fa-eye");
    this.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    this.classList.remove("fa-eye-slash");
    this.classList.add("fa-eye");
  }
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".login-form");
    const emailInput = document.querySelector("#email");
    const senhaInput = document.querySelector("#senha");
  
    // Adiciona um event listener para capturar o envio do formulário
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Impede o envio padrão do formulário
  
      // Captura os valores dos inputs
      const email = emailInput.value;
      const senha = senhaInput.value;
  
      // Exibe os valores no console (ou envie para o backend)
      console.log("Email:", email);
      console.log("Senha:", senha);
  
      // Aqui você pode adicionar código para enviar os dados via fetch ou outra lógica
  
      // Exemplo de envio via fetch
      const loginData = {
        email: email,
        senha: senha
      };
  
      fetch("http://localhost:3000/login", {
        method: "POST   ",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      })
        .then(response => response.json())
        .then(data => {
          console.log("Resposta do servidor:", data);
          // Aqui você pode adicionar a lógica para lidar com a resposta do login
        })
        .catch(error => {
          console.error("Erro na requisição:", error);
        });
    });
  });
  