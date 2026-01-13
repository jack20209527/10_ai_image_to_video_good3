// custom-toast.js
// 高端炫酷弹窗，tailwind风格，通用调用

// 动态插入弹窗DOM（只插入一次）
(function () {
    function insertToast() {
      if (document.getElementById('custom-toast')) return;
      const toast = document.createElement('div');
      toast.id = 'custom-toast';
      toast.className = "fixed inset-0 z-[9999] hidden flex justify-center items-center w-screen h-screen pointer-events-none";
      toast.style.transform = "";
      toast.innerHTML = `
        <div class="glass bg-gradient-to-r from-[#FF3366]/90 to-[#9D34DA]/90 shadow-2xl border border-white/20 rounded-2xl px-8 py-6 flex flex-col items-center animate-toast-in text-center max-w-[90vw] mx-auto" style="max-width:400px; pointer-events:auto;">
          <svg class="w-12 h-12 mb-2 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="#fff" stroke-width="2" fill="url(#grad1)"/>
            <path stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M8 12l2.5 2.5L16 9"/>
            <defs>
              <linearGradient id="grad1" x1="0" y1="0" x2="24" y2="24">
                <stop offset="0%" stop-color="#FF3366"/>
                <stop offset="100%" stop-color="#9D34DA"/>
              </linearGradient>
            </defs>
          </svg>
          <div class="text-xl font-bold text-white mb-1" id="custom-toast-title">Recharge Successful!</div>
          <div class="text-base text-white/80 mb-2" id="custom-toast-body">Your credits have been added to your account.</div>
        </div>
      `;
      document.body.appendChild(toast);
  
      // Tailwind动画（用自定义类名）
      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes toast-in {
          0% { opacity: 0; transform: translateX(-50%) translateY(-40px) scale(0.95);}
          100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1);}
        }
        .animate-toast-in {
          animation: toast-in 0.6s cubic-bezier(.4,2,.3,1) forwards;
          backdrop-filter: blur(12px);
        }
      `;
      document.head.appendChild(style);
    }
  
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", insertToast);
    } else {
      insertToast();
    }
  })();
  
  // 通用弹窗函数
  window.showCustomToast = function (messageTitle, messageBody, duration = 3000) {
    const toast = document.getElementById('custom-toast');
    if (!toast) return;
    toast.querySelector('#custom-toast-title').textContent = messageTitle;
    toast.querySelector('#custom-toast-body').textContent = messageBody;
    toast.classList.remove('hidden');
    // 重新触发动画
    const inner = toast.firstElementChild;
    inner.classList.remove('animate-toast-in');
    void inner.offsetWidth; // 触发重绘
    inner.classList.add('animate-toast-in');
    // 自动隐藏
    clearTimeout(window._customToastTimer);
    window._customToastTimer = setTimeout(() => {
      toast.classList.add('hidden');
    }, duration);
  };