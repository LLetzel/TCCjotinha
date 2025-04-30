class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <footer>
                <div class="footer-content">
                    <div class="footer-sections">

                        <div class="footer-social">
                            <h3>Redes Sociais</h3>
                            <div class="social-media">
                                <a class="media" href="https://www.instagram.com/jotinha_veiculos/" target="_blank">
                                    <i class="fab fa-instagram"></i>
                                    <span>jotinha_veiculos</span>
                                </a>
                                <a class="media" href="https://www.facebook.com/profile.php?id=100040196695116" target="_blank">
                                    <i class="fab fa-facebook"></i>
                                    <span>jotinha_veiculos</span>
                                </a>
                                <a class="media" href="https://www.instagram.com/lucasletzel_/" target="_blank">
                                    <i class="fab fa-instagram"></i>
                                    <span>lucasletzel_</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="footer-bottom">
                        <div class="rights">
                            <p>Desenvolvido por Lucas Letzel</p>
                            <p>Copyright © 2024. Todos os direitos reservados</p>
                        </div>
                    </div>
                </div>
            </footer>
        `;

        // Adiciona o CSS do componente
        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = '/src/components/footer/footer.css';
        document.head.appendChild(style);
    }
}

customElements.define('footer-component', Footer);