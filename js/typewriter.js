class Typewriter {
    constructor(element, words, options = {}) {
        this.element = element;
        this.words = words;
        this.wait = options.wait || 3000;
        this.typeSpeed = options.typeSpeed || 200;
        this.deleteSpeed = options.deleteSpeed || 100;
        this.txt = '';
        this.wordIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // 添加渐变文字和光标效果
        this.element.innerHTML = `
            <span class="relative">
                <span class="bg-gradient-to-r from-[#FF3366] via-[#FF6B3D] to-[#9D34DA] bg-clip-text text-transparent">${this.txt}</span>
                <span class="absolute right-[-4px] top-0 w-[2px] h-full bg-gradient-to-b from-[#FF3366] to-[#9D34DA] animate-blink"></span>
            </span>
        `;

        let typeSpeed = this.typeSpeed;

        if (this.isDeleting) {
            typeSpeed = this.deleteSpeed;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 1000;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// 添加闪烁动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
    .animate-blink {
        animation: blink 1s step-end infinite;
    }
`;
document.head.appendChild(style); 