class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.container = document.getElementById('particles-container');
        this.init();
    }

    init() {
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.container.appendChild(this.canvas);

        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.createParticles();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        const numberOfParticles = Math.min(window.innerWidth / 5, 300);

        for (let i = 0; i < numberOfParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 1 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                brightness: Math.random() * 0.5 + 0.5,
                color: this.getStarColor(),
                twinkleSpeed: Math.random() * 0.02 + 0.01
            });
        }
    }

    getStarColor() {
        const colors = [
            'rgba(255, 255, 255, 1)',
            'rgba(255, 255, 240, 1)',
            'rgba(240, 255, 255, 1)',
            'rgba(255, 244, 230, 1)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            // 更新位置
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // 边界检查
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // 闪烁效果
            particle.brightness += Math.sin(Date.now() * particle.twinkleSpeed) * 0.05;
            const opacity = Math.max(0.1, Math.min(1, particle.brightness));

            // 绘制星星
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color.replace('1)', `${opacity})`);
            this.ctx.fill();

            // 添加星星的光芒效果
            this.ctx.save();
            this.ctx.translate(particle.x, particle.y);
            this.ctx.rotate(Math.PI / 4);
            this.ctx.strokeStyle = particle.color.replace('1)', `${opacity * 0.5})`);
            this.ctx.lineWidth = 0.2;
            
            // 画十字星光芒
            for (let i = 0; i < 2; i++) {
                this.ctx.beginPath();
                this.ctx.moveTo(-particle.size * 2, 0);
                this.ctx.lineTo(particle.size * 2, 0);
                this.ctx.stroke();
                this.ctx.rotate(Math.PI / 2);
            }
            this.ctx.restore();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// 确保在 DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
}); 