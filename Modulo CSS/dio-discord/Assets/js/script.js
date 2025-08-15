// ===== DISCORD CLONE - JAVASCRIPT =====

// Aguarda o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Inicializar componentes
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initButtonEffects();
    
    console.log('Discord Clone inicializado com sucesso!');
}

// ===== MENU MOBILE =====
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');
    
    if (!mobileToggle) return;
    
    // Criar menu mobile se não existir
    let mobileMenu = document.querySelector('.mobile-menu');
    if (!mobileMenu) {
        mobileMenu = createMobileMenu();
    }
    
    // Toggle do menu mobile
    mobileToggle.addEventListener('click', function() {
        const isOpen = mobileMenu.classList.contains('active');
        
        if (isOpen) {
            closeMobileMenu(mobileMenu, mobileToggle);
        } else {
            openMobileMenu(mobileMenu, mobileToggle);
        }
    });
    
    // Fechar menu ao clicar em links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu(mobileMenu, mobileToggle);
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            closeMobileMenu(mobileMenu, mobileToggle);
        }
    });
    
    // Fechar menu ao redimensionar para desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            closeMobileMenu(mobileMenu, mobileToggle);
        }
    });
}

function createMobileMenu() {
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');
    
    // Clonar conteúdo do menu desktop
    if (navMenu) {
        const menuClone = navMenu.cloneNode(true);
        menuClone.className = 'mobile-nav-menu';
        mobileMenu.appendChild(menuClone);
    }
    
    if (navActions) {
        const actionsClone = navActions.cloneNode(true);
        actionsClone.className = 'mobile-nav-actions';
        mobileMenu.appendChild(actionsClone);
    }
    
    // Adicionar estilos do menu mobile
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu {
            position: fixed;
            top: 72px;
            left: 0;
            right: 0;
            background-color: var(--discord-blurple);
            transform: translateY(-100%);
            transition: transform 0.3s ease;
            z-index: 999;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .mobile-menu.active {
            transform: translateY(0);
        }
        
        .mobile-nav-menu {
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin-bottom: 20px;
        }
        
        .mobile-nav-menu .nav-link {
            padding: 12px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .mobile-nav-actions {
            display: block;
        }
        
        @media (min-width: 768px) {
            .mobile-menu {
                display: none;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(mobileMenu);
    
    return mobileMenu;
}

function openMobileMenu(menu, toggle) {
    menu.classList.add('active');
    toggle.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Animar ícone do hamburger
    const spans = toggle.querySelectorAll('span');
    if (spans.length >= 3) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    }
}

function closeMobileMenu(menu, toggle) {
    menu.classList.remove('active');
    toggle.classList.remove('active');
    document.body.style.overflow = '';
    
    // Resetar ícone do hamburger
    const spans = toggle.querySelectorAll('span');
    spans.forEach(span => {
        span.style.transform = '';
        span.style.opacity = '';
    });
}

// ===== SCROLL SUAVE =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Verificar se é um link interno válido
            if (href === '#' || href.length <= 1) return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ANIMAÇÕES NO SCROLL =====
function initScrollAnimations() {
    // Verificar se Intersection Observer é suportado
    if (!('IntersectionObserver' in window)) {
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.feature, .hero-content, .hero-image');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Adicionar estilos de animação
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .feature,
        .hero-content,
        .hero-image {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .feature:nth-child(even) {
            transform: translateY(30px) translateX(-30px);
        }
        
        .feature:nth-child(odd) {
            transform: translateY(30px) translateX(30px);
        }
    `;
    
    document.head.appendChild(animationStyle);
}

// ===== EFEITOS DOS BOTÕES =====
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Efeito ripple ao clicar
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            // Adicionar keyframes se não existirem
            if (!document.querySelector('#ripple-keyframes')) {
                const style = document.createElement('style');
                style.id = 'ripple-keyframes';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(2);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Garantir posição relativa no botão
            if (getComputedStyle(this).position === 'static') {
                this.style.position = 'relative';
            }
            
            this.appendChild(ripple);
            
            // Remover ripple após animação
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
        
        // Efeito de hover aprimorado
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// ===== UTILITÁRIOS =====

// Debounce function para otimizar eventos de scroll/resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function para eventos frequentes
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Detectar se é dispositivo móvel
function isMobile() {
    return window.innerWidth < 768;
}

// Detectar se é dispositivo touch
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// ===== PERFORMANCE E ACESSIBILIDADE =====

// Reduzir animações se o usuário preferir
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const style = document.createElement('style');
    style.textContent = `
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// Melhorar foco para navegação por teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Adicionar estilos para navegação por teclado
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--discord-yellow) !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(keyboardStyle);

// ===== LAZY LOADING PARA IMAGENS =====
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Inicializar lazy loading
initLazyLoading();

// ===== TRATAMENTO DE ERROS =====
window.addEventListener('error', function(e) {
    console.error('Erro capturado:', e.error);
    // Aqui você poderia enviar o erro para um serviço de monitoramento
});

// ===== EXPORT PARA TESTES (SE NECESSÁRIO) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        initMobileMenu,
        initSmoothScroll,
        initScrollAnimations,
        initButtonEffects,
        debounce,
        throttle,
        isMobile,
        isTouchDevice
    };
}