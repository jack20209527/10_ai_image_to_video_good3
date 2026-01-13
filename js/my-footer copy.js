// 页脚布局内容
const footerContent = `
         <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Logo和链接部分 -->
            <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                <!-- Logo部分 - 在移动端占满宽度 -->
                <div class="col-span-2 sm:col-span-2 md:col-span-1 mb-8 md:mb-0">
                    <a href="/" class="flex items-center space-x-2">
                        <div class="w-10 h-10 bg-gradient-to-r from-[#FF3366] to-[#9D34DA] rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <span class="text-xl font-bold">Flux Kontext AI</span>
                    </a>
                    <p class="mt-4 text-gray-400 text-sm md:text-base">
                        Free AI Image Enhancement & Upscaling. No Watermark. Secure & Online.
                    </p>
                </div>
    
                <!-- 功能链接 -->
                <div class="col-span-1 md:col-span-1 md:col-start-3 md:order-2">
                    <h3 class="text-base md:text-lg font-semibold mb-3 md:mb-4">Features</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-sm md:text-base text-gray-400 hover:text-white transition-colors">AI Super Resolution</a></li>
                        <li><a href="#" class="text-sm md:text-base text-gray-400 hover:text-white transition-colors">Smart Photo Repair</a></li>
                        <li><a href="#" class="text-sm md:text-base text-gray-400 hover:text-white transition-colors">Color & Style Enhancement</a></li>
                    </ul>
                </div>
    
                <!-- 关于链接 -->
                <div class="col-span-1 md:col-span-1 md:col-start-4 md:order-3">
                    <h3 class="text-base md:text-lg font-semibold mb-3 md:mb-4">About</h3>
                    <ul class="space-y-2">
                        <li><a href="/term" class="text-sm md:text-base text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                        <li><a href="/privacy" class="text-sm md:text-base text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
    
            <!-- 版权信息 -->
            <div class="mt-8 md:mt-6 pt-6 md:pt-8 border-t border-white/10 text-center">
                <p class="text-sm md:text-base text-gray-400">&copy; 2024 Flux Kontext AI. Professional Free AI Image Enhancement. All rights reserved.</p>
            </div>
        </div>
`;

// 在页面加载完成后将内容添加到footer标签中
document.addEventListener('DOMContentLoaded', function() {
  const footerElement = document.querySelector('footer');
  if (footerElement) {
      footerElement.innerHTML = footerContent;
  }
});
