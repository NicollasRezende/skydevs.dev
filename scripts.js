// Navegação e Menu Mobile
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    // Toggle menu mobile
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach((link) => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// Rolagem suave
function initializeSmoothScroll() {
    document.querySelectorAll('.nav-links a').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth',
                });
            }
        });
    });
}

// Efeito de Digitação
function initializeTypewriter() {
    const element = document.querySelector('.typewriter');
    if (!element) return;

    const text = element.textContent;
    element.textContent = '';

    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, 100); // Velocidade de digitação
}

// Sistema de Notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Inicialização do EmailJS
(function () {
    emailjs.init('FRiU869_NOPP1j2jH'); // Substitua 'FRiU869_NOPP1j2jH' pelo seu User ID do EmailJS
})();

// Manipulação do Formulário
function initializeFormHandling() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const name = formData.get('nome');
        const email = formData.get('email');
        const message = formData.get('mensagem');

        try {
            // Enviar e-mail usando EmailJS
            await emailjs.send('service_qnk8y9e', 'template_04rfxc3', {
                from_name: name,
                from_email: email,
                message: message,
                to_name: 'Nicollas', // Nome do destinatário
                to_email: 'nicollaspereira025@gmail.com',
            });

            showNotification('Mensagem enviada com sucesso!', 'success');
            form.reset();
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            showNotification(
                'Erro ao enviar mensagem. Tente novamente.',
                'error'
            );
        }
    });
}

// Botão de Voltar ao Topo
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });
}

window.addEventListener('load', function () {
    document.getElementById('preloader').style.display = 'none';
});

// Inicialização do Site
function initializeFadeIn() {
    document.getElementById('content').classList.add('visible');
}

function initializeScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-animation');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    elements.forEach((element) => {
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeSmoothScroll();
    initializeTypewriter();
    initializeFormHandling();
    initializeBackToTop();
    initializePreloader();
    initializeFadeIn();
    initializeScrollAnimations();
});
