/**
 * 通用加载状态工具类
 */
class LoadingUtil {
    constructor() {
        this.loadingElement = null;
    }

    static instance = null;

    /**
     * 获取单例实例
     */
    static getInstance() {
        if (!LoadingUtil.instance) {
            LoadingUtil.instance = new LoadingUtil();
        }
        return LoadingUtil.instance;
    }

    /**
     * 显示加载状态
     * @param {string} message - 加载提示文本（可选）
     * @param {string} subMessage - 副标题文本（可选）
     */

 
    static show(message = 'Loading...', subMessage = 'please wait a moment') {
        const instance = LoadingUtil.getInstance();
        if (instance.loadingElement) {
            return;
        }
    
        const loadingElement = document.createElement('div');
        loadingElement.className = 'fixed inset-0 flex items-center justify-center z-50';
        
        loadingElement.innerHTML = `
            <div class="relative" style="width: 420px; height: 220px;">
                <!-- 背景光晕效果（冷色系，暗色风格） -->
                <div class="absolute inset-0 bg-gradient-to-br from-[#2563EB]/25 via-[#06B6D4]/20 to-[#1E293B]/20 rounded-2xl blur-xl"></div>
                
                <!-- 主容器（玻璃拟态 + 暗色） -->
                <div class="relative w-full h-full bg-[#0b0e13]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6 overflow-hidden shadow-[0_20px_80px_-20px_rgba(0,0,0,0.7)]">
                    <!-- 动态背景细纹与渐变流动 -->
                    <div class="absolute inset-0 bg-gradient-to-r from-[#2563EB]/10 to-[#06B6D4]/10 animate-gradient"></div>
                    <div class="absolute inset-0 bg-grid opacity-10"></div>
                    
                    <!-- 内容区域 -->
                    <div class="relative flex flex-col items-center justify-center h-full select-none">
                        <!-- 加载动画（中心图标 + 环绕小点） -->
                        <div class="relative mb-4">
                            <!-- 外环发光圈 -->
                            <div class="absolute -inset-3 rounded-full bg-gradient-to-tr from-blue-500/20 to-cyan-400/20 blur-xl"></div>
                            <!-- 旋转环 -->
                            <div class="w-16 h-16 rounded-full border-2 border-transparent loading-spinner" style="border-top-color:#60A5FA;border-bottom-color:#22D3EE"></div>
                            <!-- 中心图标 -->
                            <div class="absolute inset-0 flex items-center justify-center">
                                <svg class="w-6 h-6 text-blue-300 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="M7 17l10-10"/></svg>
                            </div>
                            <!-- 环绕小点（旋转） -->
                            <div class="absolute inset-0 orbit">
                                <span class="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-400"></span>
                                <span class="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                                <span class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                                <span class="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-400"></span>
                            </div>
                        </div>
                        
                        <!-- 文字区域 -->
                        <div class="text-center">
                            <p class="text-[18px] font-semibold text-white mb-1">${message}</p>
                            ${subMessage ? `<p class="text-gray-400 text-[13px]">${subMessage}</p>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    
        // 添加必要的样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            @keyframes gradient {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            .loading-spinner {
                animation: spin 1s linear infinite;
            }
            .animate-gradient {
                background-size: 200% 200%;
                animation: gradient 8s linear infinite;
            }
            .bg-grid {
                background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
                background-size: 20px 20px;
            }
        `;
        document.head.appendChild(style);
    
        document.body.appendChild(loadingElement);
        instance.loadingElement = loadingElement;
    }

    /**
     * 隐藏加载状态
     */
    static hide() {
        const instance = LoadingUtil.getInstance();
        if (instance.loadingElement) {
            instance.loadingElement.remove();
            instance.loadingElement = null;
        }
    }
}

// 导出为全局变量
window.LoadingUtil = LoadingUtil; 