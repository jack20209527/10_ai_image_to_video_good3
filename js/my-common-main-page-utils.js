
/**
 * 页面层级的公用的函数
 */
// 以下是自身页面的点击
document.addEventListener('DOMContentLoaded', () => {

    // 滚动到顶部
    const startCreatingButton = document.getElementById('start-creating-button');
    startCreatingButton.addEventListener('click', (event) => {
        event.preventDefault(); // 阻止默认的链接跳转行为
        ScrollUtil.scrollToTop(800); // 调用滚动到顶部的函数
    });

    
});


// 滚动到页面顶部
const ScrollUtil = {
    scrollToTop: function(duration) {
        const start = window.scrollY; // 当前滚动位置
        const startTime = performance.now(); // 开始时间

        const animateScroll = () => {
            const currentTime = performance.now();
            const timeElapsed = currentTime - startTime; // 经过的时间
            const progress = Math.min(timeElapsed / duration, 1); // 计算进度

            // 使用线性插值计算当前滚动位置
            const scrollTo = start * (1 - progress); // 计算新的滚动位置
            window.scrollTo(0, scrollTo); // 滚动到新的位置

            if (progress < 1) {
                requestAnimationFrame(animateScroll); // 继续动画
            }
        };

        requestAnimationFrame(animateScroll); // 开始动画
    }
};

