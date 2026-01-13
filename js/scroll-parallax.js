class ScrollParallax {
    constructor() {
        this.sections = document.querySelectorAll('[data-parallax]');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
        this.handleScroll(); // 初始化时执行一次
    }

    handleScroll() {
        const scrolled = window.pageYOffset;

        this.sections.forEach(section => {
            const speed = section.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            section.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new ScrollParallax();
}); 