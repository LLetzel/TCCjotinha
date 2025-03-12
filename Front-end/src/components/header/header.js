class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <header>
                <div class="container">
                    <div class="logo">
                        <a href="/Front-end/src/home/home.html">
                            <img src="/Front-end/img/logonome.png" alt="Logo">
                        </a>
                    </div>

                    <nav class="nav-menu">
                        <a href="/Front-end/src/home/home.html">Início</a>
                        <a href="/Front-end/src/estoque/estoque.html">Estoque</a>
                        <a href="/Front-end/src/sobrenos/sobrenos.html">Sobre nós</a>
                        <a href="/Front-end/src/contato/contato.html">Contato</a>
                        <a href="/Front-end/src/consignar/consignar.html">Consignar</a>
                        <div class="auth-links-mobile">
                            <a id="loginMobile" href="/Front-end/src/login/login.html">Login</a>
                            <a id="cadastroMobile" href="/Front-end/src/cadastro/cadastro.html">Cadastrar-se</a>
                        </div>
                    </nav>

                    <div class="auth-links-desktop">
                        <a id="login" href="/Front-end/src/login/login.html">Login</a>
                        <a id="cadastro" href="/Front-end/src/cadastro/cadastro.html">Cadastrar-se</a>
                    </div>

                    <button class="menu-toggle">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
                <div class="divisoria"></div>
            </header>
        `;

        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = '/Front-end/src/components/header/header.css';
        document.head.appendChild(style);

        // Check if user is logged in
        if (localStorage.getItem('userId')) {
            const loginBtn = this.querySelector('#login');
            const cadastroBtn = this.querySelector('#cadastro');
            const loginMobileBtn = this.querySelector('#loginMobile');
            const cadastroMobileBtn = this.querySelector('#cadastroMobile');

            // Update desktop buttons
            loginBtn.innerHTML = '<i class="fas fa-user-circle"></i> Perfil';
            loginBtn.href = '/Front-end/src/perfil/perfil.html';
            
            cadastroBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Sair';
            cadastroBtn.href = '#';
            cadastroBtn.onclick = this.fazerLogout;

            // Update mobile buttons
            loginMobileBtn.innerHTML = '<i class="fas fa-user-circle"></i> Perfil';
            loginMobileBtn.href = '/Front-end/src/perfil/perfil.html';
            
            cadastroMobileBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Sair';
            cadastroMobileBtn.href = '#';
            cadastroMobileBtn.onclick = this.fazerLogout;
        }

        // Mobile menu toggle
        const menuToggle = this.querySelector('.menu-toggle');
        const navMenu = this.querySelector('.nav-menu');

        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!this.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }

    fazerLogout(e) {
        e.preventDefault();
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        window.location.href = '/Front-end/src/home/home.html';
    }
}


// function logout() {
//     localStorage.removeItem('userId');
//     localStorage.removeItem('userRole');
//     window.location.href = '/Front-end/src/login/login.html';
// }

customElements.define('header-component', Header);
