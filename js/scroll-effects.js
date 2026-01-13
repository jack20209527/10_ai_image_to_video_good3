class ScrollEffects {
    constructor() {
        this.init();
    }

    init() {
        // 滚动视差效果
        this.parallaxElements = document.querySelectorAll('[data-parallax]');
        // 渐入效果
        this.fadeElements = document.querySelectorAll('[data-fade]');
        // 缩放效果
        this.scaleElements = document.querySelectorAll('[data-scale]');

        window.addEventListener('scroll', () => {
            this.handleParallax();
            this.handleFade();
            this.handleScale();
        });

        // 初始触发一次
        this.handleParallax();
        this.handleFade();
        this.handleScale();
    }

    handleParallax() {
        this.parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const rect = element.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            
            const limit = rect.top + rect.height;
            const current = rect.top - window.innerHeight;
            
            if (current <= 0 && limit >= 0) {
                const progress = (current * -1) / (limit - current);
                const move = progress * speed * 100;
                element.style.transform = `translate3d(0, ${move}px, 0)`;
            }
        });
    }

    handleFade() {
        this.fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const fadeStart = element.dataset.fadeStart || 0.2;
            const fadeEnd = element.dataset.fadeEnd || 0.8;
            
            const windowHeight = window.innerHeight;
            const elementTop = rect.top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('fade-in');
            }
        });
    }

    handleScale() {
        this.scaleElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const scaleStart = element.dataset.scaleStart || 0.2;
            const scaleEnd = element.dataset.scaleEnd || 0.8;
            
            const windowHeight = window.innerHeight;
            const elementTop = rect.top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('scale-in');
            }
        });
    }
}

// 添加相关的 CSS 动画类
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeIn 1s ease-out forwards;
    }

    .scale-in {
        animation: scaleIn 1s ease-out forwards;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// 初始化滚动效果
document.addEventListener('DOMContentLoaded', () => {
    new ScrollEffects();
}); 