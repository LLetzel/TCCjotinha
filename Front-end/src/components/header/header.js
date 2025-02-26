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
                            <a id="login" href="/Front-end/src/login/login.html">Login</a>
                            <a id="cadastro" href="/Front-end/src/cadastro/cadastro.html">Cadastrar-se</a>
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

        // Adiciona o CSS do componente
        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = '/Front-end/src/components/header/header.css';
        document.head.appendChild(style);

        // Adiciona a funcionalidade do menu mobile
        const menuToggle = this.querySelector('.menu-toggle');
        const navMenu = this.querySelector('.nav-menu');

        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Fecha o menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!this.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });

        // Fecha o menu ao clicar em um link
        const navLinks = this.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

customElements.define('header-component', Header);
