class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <header>
                <div class="container">
                    <div class="logo">
                        <a href="/home/home.html"><img src="/img/logonome.png" alt="Logo"></a>
                    </div>

                    <nav class="nav-menu">
                        <a href="/home">Início</a>
                        <a href="/estoque">Estoque</a>
                        <a href="/sobrenos">Sobre nós</a>
                        <a href="/contato">Contato</a>
                        <a href="/consignar">Consignar</a>
                        <div class="auth-links-mobile">
                            <a id="login" href="/login">Login</a>
                            <a id="cadastro" href="/cadastro">Cadastrar-se</a>
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

        // Adiciona o CSS do componente
        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = '/components/header/header.css';
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
