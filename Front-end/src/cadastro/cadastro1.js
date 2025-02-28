function cadastrar() {
    let nome = document.querySelector('#name').value;
    let datanascimento = document.querySelector('#nascimento').value;
    let cpf = document.querySelector('#cpf').value;
    let sexo = document.querySelector('#sexo').value;

    if (!nome || !datanascimento || !cpf || !sexo) {
        alert('Preencha todos os campos');
        return;
    }

    let dadospessoais = {
        nome,
        datanascimento,
        cpf,
        sexo
    };

    localStorage.setItem('cadastroDadosPessoais', JSON.stringify(dadospessoais));
    
    if (localStorage.getItem('cadastroDadosPessoais')) {
        window.location.href = '/cadastro2.html';
    }
}
