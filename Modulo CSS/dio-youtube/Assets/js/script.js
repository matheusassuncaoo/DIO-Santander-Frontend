// ===== YOUTUBE CLONE - INTERATIVIDADE =====

// Elementos do DOM
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const searchInput = document.querySelector('.search-input');
const videoCards = document.querySelectorAll('.video-card');

// Estado da sidebar
let sidebarOpen = false;

// ===== TOGGLE SIDEBAR (MOBILE) =====
function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
    
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle('open', sidebarOpen);
        
        // Criar/remover overlay
        let overlay = document.querySelector('.sidebar-overlay');
        
        if (sidebarOpen && !overlay) {
            overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            document.body.appendChild(overlay);
            
            // Fechar sidebar ao clicar no overlay
            overlay.addEventListener('click', closeSidebar);
            
            // Ativar overlay após um pequeno delay
            setTimeout(() => overlay.classList.add('active'), 10);
        } else if (!sidebarOpen && overlay) {
            overlay.classList.remove('active');
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 300);
        }
    }
}

// Fechar sidebar
function closeSidebar() {
    if (sidebarOpen) {
        sidebarOpen = false;
        sidebar.classList.remove('open');
        
        const overlay = document.querySelector('.sidebar-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 300);
        }
    }
}

// ===== EVENT LISTENERS =====

// Menu button click
if (menuBtn) {
    menuBtn.addEventListener('click', toggleSidebar);
}

// Fechar sidebar com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebarOpen) {
        closeSidebar();
    }
});

// Redimensionamento da janela
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && sidebarOpen) {
        closeSidebar();
    }
});

// ===== FUNCIONALIDADE DE BUSCA =====
if (searchInput) {
    // Foco na barra de pesquisa com Ctrl+K ou Cmd+K
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });
    
    // Placeholder dinâmico
    const searchPlaceholders = [
        'Pesquisar',
        'Buscar vídeos...',
        'O que você quer assistir?',
        'Encontre seu conteúdo favorito'
    ];
    
    let placeholderIndex = 0;
    
    // Alterar placeholder quando não há foco
    searchInput.addEventListener('blur', () => {
        if (!searchInput.value) {
            setTimeout(() => {
                placeholderIndex = (placeholderIndex + 1) % searchPlaceholders.length;
                searchInput.placeholder = searchPlaceholders[placeholderIndex];
            }, 2000);
        }
    });
    
    // Resetar placeholder no foco
    searchInput.addEventListener('focus', () => {
        searchInput.placeholder = 'Pesquisar';
    });
}

// ===== ANIMAÇÕES DOS CARDS DE VÍDEO =====
function animateVideoCards() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    videoCards.forEach((card, index) => {
        // Inicializar estado
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        observer.observe(card);
    });
}

// ===== HOVER EFFECTS AVANÇADOS =====
function setupHoverEffects() {
    videoCards.forEach(card => {
        const thumbnail = card.querySelector('.video-thumbnail');
        const title = card.querySelector('.video-title');
        
        card.addEventListener('mouseenter', () => {
            // Efeito de escala suave no thumbnail
            if (thumbnail) {
                thumbnail.style.transform = 'scale(1.05)';
                thumbnail.style.transition = 'transform 0.3s ease';
            }
            
            // Destacar título
            if (title) {
                title.style.color = '#FFFFFF';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Resetar efeitos
            if (thumbnail) {
                thumbnail.style.transform = 'scale(1)';
            }
            
            if (title) {
                title.style.color = '';
            }
        });
    });
}

// ===== SIMULAÇÃO DE CLIQUE EM VÍDEO =====
function setupVideoInteraction() {
    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.video-title')?.textContent;
            
            // Efeito visual de clique
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
            
            // Simular carregamento (apenas visual)
            console.log(`Reproduzindo: ${title}`);
            
            // Aqui você poderia adicionar navegação real ou modal de vídeo
            // Por exemplo: window.location.href = `/watch?v=${videoId}`;
        });
    });
}

// ===== SCROLL SUAVE PARA NAVEGAÇÃO =====
function setupSmoothScroll() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remover classe active de todos os itens
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Adicionar classe active ao item clicado
            item.classList.add('active');
            
            // Scroll suave para o topo
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Fechar sidebar no mobile após clique
            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        });
    });
}

// ===== FORMATAÇÃO DE NÚMEROS =====
function formatViewCount(count) {
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + ' mi';
    } else if (count >= 1000) {
        return (count / 1000).toFixed(0) + ' mil';
    }
    return count.toString();
}

// ===== SIMULAÇÃO DE DADOS DINÂMICOS =====
function updateVideoStats() {
    const statsElements = document.querySelectorAll('.video-stats');
    
    statsElements.forEach(stat => {
        // Simular pequeno incremento nas visualizações
        const currentText = stat.textContent;
        const match = currentText.match(/([\d,]+(?:\.\d+)?\s*(?:mil|mi)?)/);
        
        if (match) {
            // Adicionar pequena variação visual (apenas cosmética)
            stat.style.opacity = '0.8';
            setTimeout(() => {
                stat.style.opacity = '1';
            }, 100);
        }
    });
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎥 YouTube Clone carregado com sucesso!');
    
    // Inicializar funcionalidades
    animateVideoCards();
    setupHoverEffects();
    setupVideoInteraction();
    setupSmoothScroll();
    
    // Atualizar stats periodicamente (apenas visual)
    setInterval(updateVideoStats, 30000); // A cada 30 segundos
    
    // Adicionar classe de carregamento concluído
    document.body.classList.add('loaded');
});

// ===== PERFORMANCE E OTIMIZAÇÃO =====

// Debounce para redimensionamento
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

// Otimizar eventos de resize
const debouncedResize = debounce(() => {
    if (window.innerWidth > 768 && sidebarOpen) {
        closeSidebar();
    }
}, 250);

window.addEventListener('resize', debouncedResize);

// ===== ACESSIBILIDADE =====

// Navegação por teclado
document.addEventListener('keydown', (e) => {
    // Tab navigation melhorada
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Remover indicador de navegação por teclado no mouse
document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// ===== EASTER EGG =====
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg ativado!
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 3000);
        
        console.log('🎉 Konami Code ativado! Você encontrou o easter egg!');
        konamiCode = [];
    }
});

// ===== EXPORT PARA POSSÍVEL MODULARIZAÇÃO =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleSidebar,
        closeSidebar,
        formatViewCount
    };
}