
/**
 * 首页，顶部视频列表的播放代码
 */
/**
 * 首页，顶部视频列表的播放代码
 */
const videoSources = [
    "https://mstream.app/video/1747787516776_250413_161404_333_9374_37.mp4",
    "https://mstream.app/video/1747787522758_250413_162544_300_6887_37.mp4",
    "https://mstream.app/video/1747787728224_250413_163713_287_6141_37.mp4",
    "https://mstream.app/video/1747787731713_250413_164153_018_3707_37.mp4",
    "https://mstream.app/video/1747787735675_250413_165330_476_4350_37.mp4",
    "https://mstream.app/video/1747787740024_250413_171501_349_5557_37.mp4",
    "https://mstream.app/video/1747787743078_250413_171845_794_5710_37.mp4",
    "https://mstream.app/video/1747787747605_250413_172227_789_1156_37.mp4",
    "https://mstream.app/video/1747787753154_250413_172857_135_4041_37.mp4",
    "https://mstream.app/video/1747787761762_250413_174656_495_6007_37.mp4",
    "https://mstream.app/video/1747787772068_250413_175022_873_9919_37.mp4",
    "https://mstream.app/video/1747787778461_250413_175839_722_4670_37.mp4",
    "https://mstream.app/video/1747787788108_250413_180317_651_14_37.mp4",
    "https://mstream.app/video/1747787800218_250413_181002_054_8480_37.mp4"
];

const videoList = document.getElementById('videoList');
let scrollInterval;

// 创建视频卡片
videoSources.forEach(src => {
    const videoCard = document.createElement('div');
    videoCard.className = 'flex-shrink-0 w-[260px] relative'; // 添加相对定位
    videoCard.innerHTML = `
        <div class="mr-4 aspect-[9/16] bg-muted rounded-lg overflow-hidden cursor-pointer">
            <video src="${src}" class="w-full h-full object-cover" loop muted playsinline autoplay></video>
            <div class="absolute inset-0 bg-black opacity-0 transition-opacity duration-300"></div> <!-- 暗色蒙层 -->
        </div>
    `;
    
    // 鼠标悬停事件
    videoCard.addEventListener('mouseenter', () => {
        clearInterval(scrollInterval); // 停止滚动
        const overlay = videoCard.querySelector('div.absolute');
        overlay.style.opacity = '0.5'; // 显示蒙层
    });

    // 鼠标移出事件
    videoCard.addEventListener('mouseleave', () => {
        scrollInterval = startScrolling(); // 重新开始滚动
        const overlay = videoCard.querySelector('div.absolute');
        overlay.style.opacity = '0'; // 隐藏蒙层
    });

    videoList.appendChild(videoCard);
});

// 开始滚动的函数
function startScrolling() {
    return setInterval(() => {
        videoList.scrollBy({
            left: 1, // 每次滚动的距离
            behavior: 'smooth' // 平滑滚动
        });
    }, 20); // 每20毫秒滚动一次
}

// 初始化滚动
scrollInterval = startScrolling();


// const videoSources = [
//     "https://mstream.app/video/1747787516776_250413_161404_333_9374_37.mp4",
//     "https://mstream.app/video/1747787522758_250413_162544_300_6887_37.mp4",
//     "https://mstream.app/video/1747787728224_250413_163713_287_6141_37.mp4",
//     "https://mstream.app/video/1747787731713_250413_164153_018_3707_37.mp4",
//     "https://mstream.app/video/1747787735675_250413_165330_476_4350_37.mp4",
//     "https://mstream.app/video/1747787740024_250413_171501_349_5557_37.mp4",
//     "https://mstream.app/video/1747787743078_250413_171845_794_5710_37.mp4",
//     "https://mstream.app/video/1747787747605_250413_172227_789_1156_37.mp4",
//     "https://mstream.app/video/1747787753154_250413_172857_135_4041_37.mp4",
//     "https://mstream.app/video/1747787761762_250413_174656_495_6007_37.mp4",
//     "https://mstream.app/video/1747787772068_250413_175022_873_9919_37.mp4",
//     "https://mstream.app/video/1747787778461_250413_175839_722_4670_37.mp4",
//     "https://mstream.app/video/1747787788108_250413_180317_651_14_37.mp4",
//     "https://mstream.app/video/1747787800218_250413_181002_054_8480_37.mp4"
// ];

// const videoList = document.getElementById('videoList');

// videoSources.forEach(src => {
//     const videoCard = document.createElement('div');
//     // 每个视频的大小
//     videoCard.className = 'flex-shrink-0 w-[260px]';
//     videoCard.innerHTML = `
//         <div class="mr-4 aspect-[9/16] bg-muted rounded-lg overflow-hidden cursor-pointer">
//             <video src="${src}" class="w-full h-full object-cover" loop muted playsinline autoplay></video>
//         </div>
//     `;
//     videoList.appendChild(videoCard);
// });
