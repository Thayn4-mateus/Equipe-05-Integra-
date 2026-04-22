document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM carregado, iniciando animações...");

    const animarNumeros = () => {
        const contadores = document.querySelectorAll('.num-contador');
        if (contadores.length === 0) return;

        const numObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const elemento = entry.target;
                    const alvo = +elemento.getAttribute('data-target');
                    const duration = 2000;
                    let startTime = null;

                    const step = (currentTime) => {
                        if (!startTime) startTime = currentTime;
                        const progress = Math.min((currentTime - startTime) / duration, 1);
                        elemento.innerText = Math.floor(progress * alvo);
                        if (progress < 1) window.requestAnimationFrame(step);
                        else elemento.innerText = alvo;
                    };
                    window.requestAnimationFrame(step);
                    numObserver.unobserve(elemento);
                }
            });
        }, { threshold: 0.1 });

        contadores.forEach(c => numObserver.observe(c));
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-scroll');
                if(entry.target.classList.contains('barreira-item')) {
                    entry.target.classList.add('visivel');
                }
            }
        });
    }, { threshold: 0.1 });


    const targets = document.querySelectorAll('.Titulo, .texto_principal, .botoes_group, .card_azul, .card_branco, .cards_sessao1, .cards_sessao2, .cards_sessao4');

    targets.forEach((el) => {
        el.classList.add('hidden-scroll');
        observer.observe(el);
    });

  
    window.addEventListener('scroll', () => {
        const heroImg = document.querySelector('.img_home img');
        if (heroImg) {
            let scrollValue = window.scrollY;
            heroImg.style.transform = `translateY(${scrollValue * 0.05}px)`; // Reduzi para 0.05 para ser mais sutil
        }
    });

    animarNumeros();
});

document.addEventListener('DOMContentLoaded', () => {
    const passos = document.querySelectorAll('.passo');
    
    const observerEtapas = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
       
                passos.forEach((passo, index) => {
                    setTimeout(() => {
                        passo.classList.add('pop-visible');
                    }, index * 250);
                });
                
                observerEtapas.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });


    const containerEtapas = document.querySelector('.sessao-etapas');
    if (containerEtapas) {
        observerEtapas.observe(containerEtapas);
    }
});


const containerEtapas = document.querySelector('.sessao-etapas');
const passos = document.querySelectorAll('.passo');

if (containerEtapas) {
    const observerEtapas = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                passos.forEach((passo, index) => {
                    setTimeout(() => {
                        passo.classList.add('pop-visible');
                    }, index * 250);
                });
                observerEtapas.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 }); 

    observerEtapas.observe(containerEtapas);
}

const animarFinais = () => {

    const barreiraCards = document.querySelectorAll('.barreira-card');
    const checklistItems = document.querySelectorAll('.checklist-item');

    const observerGeral = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const targets = entry.target.parentElement.querySelectorAll(entry.target.tagName === 'DIV' ? '.barreira-card' : '.checklist-item');
                
                if (entry.target.classList.contains('barreira-card')) {
                    entry.target.classList.add('show');
                } else {
                    entry.target.classList.add('visible');
                }
            }
        });
    }, { threshold: 0.1 });

    barreiraCards.forEach(card => observerGeral.observe(card));
    checklistItems.forEach(item => observerGeral.observe(item));

    const secaoNumeros = document.querySelector('.sessao-realidade'); 
    if (secaoNumeros) {
        const observerNumeros = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animarNumeros(); 
                observerNumeros.unobserve(secaoNumeros);
            }
        }, { threshold: 0.3 });
        observerNumeros.observe(secaoNumeros);
    }
};


document.addEventListener('DOMContentLoaded', () => {
    animarFinais();
});