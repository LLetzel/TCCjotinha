function cadastrar() {
    let nomeInput = document.querySelector('#name').value;
    let datanascimentoInput = document.querySelector('#nascimento').value;
    let cpfInput = document.querySelector('#cpf').value;
    let sexoInput = document.querySelector('#sexo').value;

    if (!nomeInput || !datanascimentoInput || !cpfInput || !sexoInput) {
        alert('Preencha todos os campos');
        return;
    }

    const submitButton = document.querySelector('.submit-btn');
}