class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <header>
                <div class="container">
                    <div class="logo">
                        <a href="/home">
                            <img src="/img/logonome.png" alt="Logo">
                        </a>
                    </div>

                    <nav class="nav-menu">
                        <a href="/home">Início</a>
                        <a href="/estoque">Estoque</a>
                        <a href="/sobrenos">Sobre nós</a>
                        <a href="/contato">Contato</a>
                        <a href="/consignar">Consignar</a>
                        <div class="auth-links-mobile">
                            <a id="loginMobile" href="/login">Login</a>
                            <a id="cadastroMobile" href="/cadastro">Cadastrar-se</a>
                        </div>
                    </nav>

                    <div class="auth-links-desktop">
                        <a id="login" href="/login">Login</a>
                        <a id="cadastro" href="/cadastro">Cadastrar-se</a>
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
        style.href = '/src/components/header/header.css';
        document.head.appendChild(style);

        // Check if user is logged in
        if (localStorage.getItem('userId')) {
            const loginBtn = this.querySelector('#login');
            const cadastroBtn = this.querySelector('#cadastro');
            const loginMobileBtn = this.querySelector('#loginMobile');
            const cadastroMobileBtn = this.querySelector('#cadastroMobile');

            // Update desktop buttons
            loginBtn.innerHTML = '<i class="fas fa-user-circle"></i> Perfil';
            loginBtn.href = '/perfil';
            
            cadastroBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Sair';
            cadastroBtn.href = '#';
            cadastroBtn.onclick = this.fazerLogout;

            // Update mobile buttons
            loginMobileBtn.innerHTML = '<i class="fas fa-user-circle"></i> Perfil';
            loginMobileBtn.href = '/perfil';
            
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
        window.location.href = '/home';
    }
}

customElements.define('header-component', Header);
