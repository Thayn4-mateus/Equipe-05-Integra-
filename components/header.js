class Header extends HTMLElement{
    connectedCallback(){
    
        this.innerHTML = `
        <header>
        <div class="header_container">
            <div class="container_logo">
                <img src="../img/Logo_Integra+.svg" alt="Logo_da_Integra_mais">
            </div>
            <nav class="links_container">
                <a href="/index.html">Inicio </a>
                <a href="#">Quem Somos </a>
                <a href="/pages/03_servicos.html">Serviços </a>
                <a href="../pages/04_treinamentos.html">Treinamentos </a>
                <a href="#">Suporte </a>
                <a href="/05_suporte.html">Suporte </a>
                <a href="#">Noticias </a>
            </nav>
            <div class="container_botoes">
                <div class="icone_perfil">
                    <img src="../img/Login.svg" alt="Botao_de_login" >
                </div>
                <button class="botao_de_diagnostico">Diagnosticar</button>
                <div class="botao_menu_lateral">
                    <img src="../img/Menu_sanduiche.svg" alt="botao_de_menu_lateral">
                </div>
            </div>
            </header>
            
            <aside class="container_menu_lateral">
                <div class="header_menu_lateral">
                    <img src="../img/Logo_Integra+.svg" alt="Logo da integra no menu lateral"> 
                    <button class="botao_fechar"><img src="/img/icone_de_fechar.svg" alt=" Botao de fechar menu lateral "></button>
                </div>
                <div class="botoes_menu_lateral">
                    <button class="botao_cadastre_se">Cadastre-se</button>
                    <button class="botao_entrar"> Entre </button>
                </div>
                <nav class="menu_lateral_links">
                    <a href="#">Inicio</a>
                    <a href="#">Quem Somos</a>
                    <a href="/pages/03_servicos.html">Serviços</a>
                    <a href="/pages/04_treinamentos.html">Treinamentos</a>
                    <a>Suporte</a>
                    <a href="#">Diagnóstico</a>
                </nav>
            </aside>
            <div class="overlay" id="overlay"></div>
        </div>
            `;

            function configurarAnimacoes() {
                const btnAbrir = document.querySelector('.botao_menu_lateral');
                const btnFechar = document.querySelector('.botao_fechar');
                const menuLateral = document.querySelector('.container_menu_lateral');
                const overlay = document.querySelector('#overlay');
            
                if (btnAbrir && menuLateral && overlay) {
                    btnAbrir.addEventListener('click', () => {
                        menuLateral.classList.add('ativo');
                        overlay.classList.add('ativo');
                    });
            
                    const fecharMenu = () => {
                        menuLateral.classList.remove('ativo');
                        overlay.classList.remove('ativo');
                    };
            
                    btnFechar.addEventListener('click', fecharMenu);
                    overlay.addEventListener('click', fecharMenu);
                }
            }
        configurarAnimacoes();
    }
}
    
customElements.define("header-component", Header )
