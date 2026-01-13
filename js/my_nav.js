// 顶部导航栏、移动适配菜单、左侧边栏
// <span class="text-[#6aa7ff]">Seedance</span>
// <span class="text-white">AI</span>
// <p id="id_nav_logo_text" class="bg-gradient-to-r from-green-500 to-red-500 bg-clip-text text-transparent ml-2 hover:text-red-500">
// <p id="id_nav_logo_text" class="font-medium bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent  text-transparent ml-2 hover:text-red-500"></p>
// 页面顶部导航栏布局内容
const nav_header_content = `
        <div class="mx-auto h-full px-4 flex items-center">
            <div class="flex items-center gap-2 text-xl font-semibold select-none">

                <a href="/" class="flex items-center cursor-pointer">
                    <div class="rounded-lg flex items-center justify-center">
                        <img id="id_nav_logo_image" alt="AI Photo To Video" class="w-10 h-10 logo-hover" src="/img/logo.png"/>
                    </div>

                    
                    <p id="id_nav_logo_text" style="font-family: Impact, sans-serif;" class="bg-gradient-to-r from-green-500 to-red-500 bg-clip-text text-transparent ml-2 hover:text-red-500">
                        Photo To Video
                    </p>
                </a>

            </div>
            <!-- 正常的顶部导航 -->
            <nav class="ml-6 hidden md:hidden lg:flex items-center gap-6 text-sm text-gray-300">
                <button id="id_btn_nav_video" class="group inline-flex items-center gap-1.5 hover:text-red-500 cursor-pointer">
                    AI Video
                    <svg class="w-3.5 h-3.5 text-gray-400 group-hover:text-red-500 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                <button id="id_btn_nav_image" class="group inline-flex items-center gap-1.5 hover:text-red-500 cursor-pointer">
                    AI Image
                    <svg class="w-3.5 h-3.5 text-gray-400 group-hover:text-red-500 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                <button id="id_btn_nav_video_effect" class="group inline-flex items-center gap-1.5 hover:text-red-500 cursor-pointer">
                    Video Effect
                </button>
                <button id="id_btn_nav_blog" class="group inline-flex items-center gap-1.5 hover:text-red-500 cursor-pointer">
                    Blog
                </button>
                <button id="id_btn_nav_my_creations" class="group inline-flex items-center gap-1.5 hover:text-red-500 cursor-pointer">
                    My Creations
                </button>
                <button id="id_btn_nav_pricing" class="group inline-flex items-center gap-1.5 hover:text-red-500 cursor-pointer">
                    Pricing
                </button>
            </nav>

            <div class="ml-auto flex items-center gap-3">
                <!-- 顶部导航: 积分 -->
                <a class="text-white cursor-pointer hover:text-white transition-colors" >
                    <div id="id_nav_credit_cart_layouot" class="flex items-center h-8 px-2 space-x-1 rounded-[8px] bg-[#23232b] border border-white/10 hover:bg-[#33333b]">
                        <img src="../img/credit_solid.png" alt="credit_cart" class="w-6 h-6">
                        <span id="id_nav_credit_cart_text" class="text-white text-sm">0</span>
                    </div>
                </a>

                <!-- 顶部导航: 头像部分 -->
                <div id="id_nav_user_info_layout" class="hidden flex items-center space-x-3">
                    <span id="id_nav_user_name" class="text-white text-sm">Jack Wilson</span>
                    <img id="id_nav_user_avatar" class="w-8 h-8 rounded-full ring-2 ring-[#FF3366]/30 cursor-pointer" 
                         src="https://pub-078f2a206c974966a55246e7ce00f4dd.r2.dev/icon_common_default.jpg"   alt="head">
                </div>

                <!-- 顶部导航: 登录按钮 -->
                <button id="id_btn_nav_login" class="hidden w-16 h-8 rounded-[8px] bg-red-600 hover:bg-red-500 text-white font-medium flex items-center justify-center gap-2 transition-all duration-200 ">
                    <span class="text-sm">Login</span>
                </button>

                <!-- 移动端菜单按钮 - 三条横线 -->
                <button id="id_btn_mobile_more" class="lg:hidden p-2 rounded-md bg-white/5 hover:bg-white/10" title="菜单">
                    <svg class="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

            </div>
        </div>
        
        <!-- 移动端菜单 -->
       <div id="id_mobile_menu" class="flex md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur border-b border-white/5 max-h-[400px] overflow-y-auto hidden z-40">
            <div class="px-4 py-4 space-y-4">
                <div>
                    <div class="text-[12px] tracking-wide text-gray-400 mb-2">AI Video</div>
                    <nav class="space-y-1">
                        <button id="id_btn_mobile_text2video" class="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-300 hover:text-red-500 transition">
                            <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h10M7 14h6"/></svg>
                            <span>Text to Video</span>
                        </button>
                        <button id="id_btn_mobile_image2video" class="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-300 hover:text-red-500 transition">
                            <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
                            <span>Image to Video</span>
                        </button>
                    </nav>
                </div>

                <div class="border-t border-white/10"></div>

                <div>
                    <div class="text-[12px] tracking-wide text-gray-400 mb-2">AI Image</div>
                    <nav class="space-y-1">
                        <button id="id_btn_mobile_text2image" class="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-300 hover:text-red-500 transition">
                            <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12s3-7 9-7 9 7 9 7-3 7-9 7-9-7-9-7z"/></svg>
                            <span>Text to Image</span>
                        </button>
                        <button id="id_btn_mobile_image2image" class="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-300 hover:text-red-500 transition">
                            <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16M4 6h16M4 18h16"/></svg>
                            <span>Image to Image</span>
                        </button>
                    </nav>
                </div>

                <div class="border-t border-white/10"></div>

                <div>
                    <div class="text-[12px] tracking-wide text-gray-400 mb-2">User Menus</div>
                    <nav class="space-y-1">
                        <button id="id_btn_mobile_video_effect" class="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-300 hover:text-red-500 transition">
                            <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12s3-7 9-7 9 7 9 7-3 7-9 7-9-7-9-7z"/></svg>
                            <span>Video Effect</span>
                        </button>
                        <button id="id_btn_mobile_blog" class="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-300 hover:text-red-500 transition">
                            <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16M4 6h16M4 18h16"/></svg>
                            <span>Blog</span>
                        </button>
                        <button id="id_btn_mobile_my_creations" class="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-300 hover:text-red-500 transition">
                            <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16M4 6h16M4 18h16"/></svg>
                            <span>My Creations</span>
                        </button>
                        <button id="id_btn_mobile_video_pricing" class="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-300 hover:text-red-500 transition">
                            <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16M4 6h16M4 18h16"/></svg>
                            <span>Pricing</span>
                        </button>
                    </nav>
                </div>

            </div>
        </div>
`;

// 左侧边栏布局内容，通用的
const left_sidebar_content = `
        <div class="h-full overflow-y-auto pr-2 ">
            <div class="p-3">
                <div class="text-xs text-gray-400 mb-2">AI Video</div>
                <nav class="space-y-2">
                    <button id="id_btn_sidebar_text_to_video" class="group flex items-center gap-2 w-full px-3 py-2 rounded-md text-slate-300 hover:bg-white/5 hover:text-red-500">
                        <svg class="w-[18px] h-[18px] text-slate-400 group-hover:text-red-500 " viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="6" width="18" height="12" rx="2"></rect><path d="M7 10h10M7 14h6"/></svg>
                        <span class="text-[0.92rem]">Text to Video</span>
                    </button>
                    <button id="id_btn_sidebar_image_to_video" class="group flex items-center gap-2 w-full px-3 py-2 rounded-md text-red-500 bg-[#18202b]">
                        <svg class="w-[18px] h-[18px] text-red-500 group-hover:text-red-500 " viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect></svg>
                        <span class="text-[0.92rem]">Image to Video</span>
                    </button>
                </nav>
            </div>

            <div class="px-3 mt-4">
                <div class="text-xs text-gray-400 mb-2">AI Image</div>
                <nav class="space-y-2">
                    <button id="id_btn_sidebar_text_to_image" class="group flex items-center gap-2 w-full px-3 py-2 rounded-md text-slate-300 hover:bg-white/5 hover:text-red-500">
                        <svg class="w-[18px] h-[18px] text-slate-400 group-hover:text-red-500 " viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5h16M4 10h10M4 15h8"/></svg>
                        <span class="text-[0.92rem]">Text to Image</span>
                    </button>
                    <button id="id_btn_sidebar_image_to_image" class="group flex items-center gap-2 w-full px-3 py-2 rounded-md text-slate-300 hover:bg-white/5 hover:text-red-500">
                        <svg class="w-[18px] h-[18px] text-slate-400 group-hover:text-red-500 " viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg>
                        <span class="text-[0.92rem]">Image to Image</span>
                    </button>
                </nav>
            </div>

            <div class="px-3 mt-4">
                <div class="text-xs text-gray-400 mb-2">User Menus</div>
                <nav class="space-y-2">
                    <button id="id_btn_sidebar_video_effect" class="group flex items-center gap-2 w-full px-3 py-2 rounded-md text-slate-300 hover:bg-white/5 hover:text-red-500">
                        <svg class="w-[18px] h-[18px] text-slate-400 group-hover:text-red-500 " viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg>
                        <span class="text-[0.92rem]">Video Effect</span>
                    </button>
                    <button id="id_btn_sidebar_blog" class="group flex items-center gap-2 w-full px-3 py-2 rounded-md text-slate-300 hover:bg-white/5 hover:text-red-500">
                        <svg class="w-[18px] h-[18px] text-slate-400 group-hover:text-red-500 " viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5h16M4 10h10M4 15h8"/></svg>
                        <span class="text-[0.92rem]">Blog</span>
                    </button>
                    <button id="id_btn_sidebar_my_creations" class="group flex items-center gap-2 w-full px-3 py-2 rounded-md text-slate-300 hover:bg-white/5 hover:text-red-500">
                        <svg class="w-[18px] h-[18px] text-slate-400 group-hover:text-red-500 " viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5h16M4 10h10M4 15h8"/></svg>
                        <span class="text-[0.92rem]">My Creations</span>
                    </button>
                    <button id="id_btn_sidebar_pricing" class="group flex items-center gap-2 w-full px-3 py-2 rounded-md text-slate-300 hover:bg-white/5 hover:text-red-500">
                        <svg class="w-[18px] h-[18px] text-slate-400 group-hover:text-red-500 " viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg>
                        <span class="text-[0.92rem]">Pricing</span>
                    </button>
                </nav>
            </div>

        </div>
`;

// 包括左侧和顶部导航的点击
// path_level: ../ 或者 ./
// left_sidebar_index: 按钮的序号，从上往下，从0开始; 
//                              如果是-1，就是不显示左侧边栏；
//                              如果是-2，就是显示默认的左侧边栏，不选中任何一个；
function init_nav_event(path_level, left_sidebar_index){

    document.addEventListener('DOMContentLoaded', () => {
        console.log('[Init] DOM加载完成，开始设置 --- 导航条的监听事件 {path_level: ' + path_level + '}');

        // ----------------------------- 顶部 添加内容 -----------------------------

        // 添加 顶部导航栏
        const topHeaderElement = document.querySelector('header');
        if (topHeaderElement) {
            topHeaderElement.innerHTML = nav_header_content;
        }

        // 添加 左侧边栏 布局内容;  如果是-1，就是不显示左侧边栏
        if (left_sidebar_index != -1) {
            const leftHeaderElement = document.querySelector('aside');
            if (leftHeaderElement) {
                leftHeaderElement.innerHTML = left_sidebar_content;
            }
        }

        // 设置 导航栏的登录状态 - 初始值，必须等待dom加载完成
        refreshUser ();
        // isLoggedIn = false; // 模拟登录状态
        updateUI();
        refreshJifen();

        // ----------------------------- 顶部导航栏 - 设置点击 -----------------------------
        // 工具：箭头旋转控制
        function rotateArrow(btnId, toOpen){
            try{
                var btn = document.getElementById(btnId);
                if(!btn) return;
                var svg = btn.querySelector('svg');
                if(!svg) return;
                svg.classList.add('transition-transform','duration-8900');
                if(toOpen){ svg.classList.add('rotate-180'); }
                else { svg.classList.remove('rotate-180'); }
            }catch(_){}
        }

        // 悬停即显示：AI 视频
        DropdownMenuUtil.init('id_btn_nav_video', ['Text to Video', 'Image to Video'], 0, 8, 200, (item, index) => {
            console.log(`选择了: ${item}, 索引: ${index}  `);
            DropdownMenuUtil.hide();
        }, () => { rotateArrow('id_btn_nav_video', false); });
        (function(){
            var btn = document.getElementById('id_btn_nav_video');
            if(btn){
                btn.addEventListener('mouseenter', function(){
                    rotateArrow('id_btn_nav_video', true);
                    DropdownMenuUtil.show('id_btn_nav_video', ['Text to Video', 'Image to Video'], 0, 8, 200, 
                        (item, index)=>{ 
                            DropdownMenuUtil.hide(); 
                            if  (index == 0) {
                                window.location.href = "/text-to-video";
                            } else if (index == 1) {
                                window.location.href = "/image-to-video"; 
                            }
                            console.log(`选择了: ${item}, 索引: ${index}  `);
                        }, 
                        ()=>{ rotateArrow('id_btn_nav_video', false); });
                });
            }
        })();

        // 悬停即显示：AI 图片
        DropdownMenuUtil.init('id_btn_nav_image', ['Text to Image', 'Image to Image'], 0, 8, 200, (item, index) => {
            console.log(`选择了: ${item}, 索引: ${index}  `);
            DropdownMenuUtil.hide();
        }, () => { rotateArrow('id_btn_nav_image', false); });
        (function(){
            var btn = document.getElementById('id_btn_nav_image');
            if(btn){
                btn.addEventListener('mouseenter', function(){
                    rotateArrow('id_btn_nav_image', true);
                    DropdownMenuUtil.show('id_btn_nav_image', ['Text to Image', 'Image to Image'], 0, 8, 200, 
                        (item, index)=>{ 
                            DropdownMenuUtil.hide(); 
                            if  (index == 0) {
                                window.location.href = "/text-to-image"; 
                            } else if (index == 1) {
                                window.location.href = "/image-to-image"; 
                            }
                            console.log(`选择了: ${item}, 索引: ${index}  `);
                        }, 
                        ()=>{ rotateArrow('id_btn_nav_image', false); });
                });
            }
        })();


        // 点击顶部导航栏 视频特效
        ClickUtil.onClick('id_btn_nav_video_effect', () => {
            window.location.href = "/video-effect"; 
        });

        // 点击顶部导航栏 博客
        ClickUtil.onClick('id_btn_nav_blog', () => {
            window.location.href = "/blog"; 
        });

        // 点击顶部导航栏 我的创作
        ClickUtil.onClick('id_btn_nav_my_creations', () => {
            window.location.href = "/my-creations"; 
        });

        // 点击顶部导航栏 价格
        ClickUtil.onClick('id_btn_nav_pricing', () => {
            window.location.href = "/pricing";
        });

        // 点击顶部导航栏 积分布局
        ClickUtil.onClick('id_nav_credit_cart_layouot', () => {
            window.location.href = "/pricing";
        });

        // 点击顶部导航栏 头像布局
        // 选择分辨率
        DropdownMenuUtil.init('id_nav_user_avatar', ['Pricing', 'Logout'], -190, 10, 220, (item, index) => {
            console.log(`选择了: ${item}, 索引: ${index}  `);
            if(item == 'Pricing'){
                window.location.href = "/pricing";
            }else if(item == 'Logout'){
                logout();
            }
            DropdownMenuUtil.hide();
        });

        // 点击顶部导航栏 登录
        ClickUtil.onClick('id_btn_nav_login', () => {
            window.location.href = "/login"; 
        });

        // ----------------------------- 移动端菜单 -----------------------------
        // 点击顶部导航栏 视频特效
        ClickUtil.onClick('id_btn_mobile_text2video', () => {
            window.location.href = "/text-to-video"; 
        });
        ClickUtil.onClick('id_btn_mobile_image2video', () => {
            window.location.href = "/image-to-video"; 
        });
        ClickUtil.onClick('id_btn_mobile_text2image', () => {
            window.location.href = "/text-to-image"; 
        });
        ClickUtil.onClick('id_btn_mobile_image2image', () => {
            window.location.href = "/image-to-image"; 
        });
        ClickUtil.onClick('id_btn_mobile_video_effect', () => {
            window.location.href = "/video-effect"; 
        });
        ClickUtil.onClick('id_btn_mobile_blog', () => {
            window.location.href = "/blog"; 
        });
        ClickUtil.onClick('id_btn_mobile_my_creations', () => {
            window.location.href = "/my-creations"; 
        });
        ClickUtil.onClick('id_btn_mobile_video_pricing', () => {
            window.location.href = "/pricing"; 
        });

        // ----------------------------- 左侧导航栏 -----------------------------
        if (left_sidebar_index != -1) {
            //点击左侧导航: 文生视频
            ClickUtil.onClick('id_btn_sidebar_text_to_video', () => {
                window.location.href = "/text-to-video"; 
            });
            //点击左侧导航: 图生视频
            ClickUtil.onClick('id_btn_sidebar_image_to_video', () => {
                window.location.href = "/image-to-video";
            });

            //点击左侧导航: 文生图
            ClickUtil.onClick('id_btn_sidebar_text_to_image', () => {
                window.location.href = "/text-to-image"; 
            });
            //点击左侧导航: 图生图
            ClickUtil.onClick('id_btn_sidebar_image_to_image', () => {
                window.location.href = "/image-to-image";
            });

            // 点击左侧导航 视频特效
            ClickUtil.onClick('id_btn_sidebar_video_effect', () => {
                window.location.href = "/video-effect"; 
            });

            // 点击左侧导航 博客
            ClickUtil.onClick('id_btn_sidebar_blog', () => {
                window.location.href = "/blog"; 
            });

            // 点击左侧导航 我的创作
            ClickUtil.onClick('id_btn_sidebar_my_creations', () => {
                window.location.href = "/my-creations"; 
            });

            // 点击左侧导航 价格
            ClickUtil.onClick('id_btn_sidebar_pricing', () => {
                // 显示 价格弹窗
                window.location.href = "/pricing";
            });

            set_left_sidebar_active (left_sidebar_index);
        }

        // 移动端菜单
        bindMobileMenu ();
        

    });
}

// ---------------------- 处理登录部分  begin ----------------------------
let isLoggedIn = true; // 定义变量
let localUser = LocalStorageUtil.getUserObject();

function login() {
    window.open('/login', '_self');
}

function logout() {
    console.log('登出...');
    LocalStorageUtil.removeUserItem();
    refreshUser ();
    updateUI();
    refreshJifen();
}

function updateUI() {
    const id_btn_nav_login = document.getElementById('id_btn_nav_login');
    const id_nav_user_info_layout = document.getElementById('id_nav_user_info_layout');
    const id_nav_user_name = document.getElementById('id_nav_user_name');
    const id_nav_user_avatar = document.getElementById('id_nav_user_avatar');

    if (isLoggedIn) {
        id_btn_nav_login.classList.add('hidden');
        id_nav_user_info_layout.classList.remove('hidden');
        id_nav_user_name.textContent = localUser && localUser.name ? localUser.name : 'Jack'; // Can be set dynamically based on actual situation
        id_nav_user_avatar.src = localUser && localUser.head_url ? localUser.head_url : 'https://pub-078f2a206c974966a55246e7ce00f4dd.r2.dev/icon_common_default.jpg';// "https://i.pravatar.cc/150?img=32"; // Can be set dynamically based on actual situation
        
    } else {
        id_btn_nav_login.classList.remove('hidden');
        id_nav_user_info_layout.classList.add('hidden');
    }
}

function refreshUser () {
    localUser = LocalStorageUtil.getUserObject();
    console.log('localUser: ', localUser);
    console.log(localUser == null);

    if (localUser) {
        isLoggedIn = true;
        console.log('本地数据-昵称:', localUser.name);
        console.log('本地数据-头像:', localUser.head_url);
        console.log('本地数据-uid:', localUser.uid);
        console.log('本地数据-project_id:', localUser.project_id);
        console.log('本地数据-积分:', localUser.jifen);
        console.log('本地数据-token:', localUser.token);
        console.log('本地数据-token_expire:', localUser.token_expire);
        refreshJifen();
    } else {
        console.log('本地数据为空');
        isLoggedIn = false;
    }
}


function refreshUserJifen(jifen) {
    let local_user_temp = LocalStorageUtil.getUserObject();
    local_user_temp.jifen = jifen;
    LocalStorageUtil.saveUserObject(local_user_temp);
    refreshJifen();
}

function refreshJifen() {
    const jifenSpan = document.getElementById('id_nav_credit_cart_text');
    const localUser = LocalStorageUtil.getUserObject();
    if (jifenSpan) {
        jifenSpan.textContent = localUser && localUser.jifen ? localUser.jifen : '0';
    }
}

// ---------------------- 处理登录部分  end ----------------------------

function set_left_sidebar_active(left_sidebar_index) {
    try {
        // 收集左侧边栏内的所有按钮（按从上到下顺序）
        var aside = document.querySelector('aside');
        if (!aside) return;
        var btnList = aside.querySelectorAll('nav button');
        if (!btnList || btnList.length === 0) return;

        // 统一的选中与未选中样式（基于 Tailwind）
        // 去掉外部边框
        var activeBtnClasses = ['text-red-500', 'bg-[#18202b]'];
        var inactiveBtnBase = ['flex', 'items-center', 'gap-2', 'w-full', 'px-3', 'py-2', 'rounded-md'];
        var inactiveColorClasses = ['text-slate-300', 'hover:bg-white/5', 'hover:text-red-500'];

        // hover 时图标颜色跟随
        function bindHoverIconColor(btn) {
            if (btn.getAttribute('data-hover-bound') === '1') return;
            btn.setAttribute('data-hover-bound', '1');
            btn.addEventListener('mouseenter', function() {
                try {
                    var s = btn.querySelector('svg');
                    if (s && !btn.classList.contains('text-red-500')) {
                        s.classList.add('text-red-500');
                    }
                } catch (_) { }
            });
            btn.addEventListener('mouseleave', function() {
                try {
                    var s = btn.querySelector('svg');
                    if (s && !btn.classList.contains('text-red-500')) {
                        s.classList.remove('text-red-500');
                        s.classList.add('text-slate-400');
                    }
                } catch (_) { }
            });
        }

        // 清除所有按钮的选中样式，并恢复未选中配色
        for (var i = 0; i < btnList.length; i++) {
            var btn = btnList[i];
            // 去掉可能存在的选中样式
            activeBtnClasses.forEach(function(c) { btn.classList.remove(c); });
            // 确保基础布局类存在
            inactiveBtnBase.forEach(function(c) { if (!btn.classList.contains(c)) btn.classList.add(c); });
            // 恢复未选中配色
            inactiveColorClasses.forEach(function(c) { if (!btn.classList.contains(c)) btn.classList.add(c); });

            // 图标颜色：未选中为 text-slate-400
            try {
                var svg = btn.querySelector('svg');
                if (svg) {
                    svg.classList.remove('text-red-500');
                    if (!svg.classList.contains('text-slate-400')) svg.classList.add('text-slate-400');
                }
            } catch (_) { }

            // 绑定 hover 时图标变红
            bindHoverIconColor(btn);
        }


        // -1 -2 都不处理
        // 设置目标按钮为选中态
        if (left_sidebar_index >= 0) {
            var target = btnList[left_sidebar_index];
            if (target) {
                // 去掉未选中配色中的文字色，避免冲突
                target.classList.remove('text-slate-300');
                // 添加选中配色
                activeBtnClasses.forEach(function(c) { if (!target.classList.contains(c)) target.classList.add(c); });
    
                // 图标设为 red-500（选中态常驻）
                try {
                    var svg2 = target.querySelector('svg');
                    if (svg2) {
                        svg2.classList.remove('text-slate-400');
                        if (!svg2.classList.contains('text-red-500')) svg2.classList.add('text-red-500');
                    }
                } catch (_) { }
            }
        }
        
    } catch (err) {
        console.error('[左侧选中态] 设置失败: ', err);
    }
}
// function set_left_sidebar_active(left_sidebar_index){
//     try{
//         // 收集左侧边栏内的所有按钮（按从上到下顺序）
//         var aside = document.querySelector('aside');
//         if(!aside) return;
//         var btnList = aside.querySelectorAll('nav button');
//         if(!btnList || btnList.length===0) return;

//         // 若未传入序号，则不主动改动现有默认选中（保留初始模板中的选中态）
//         var hasIndex = (typeof left_sidebar_index === 'number') && left_sidebar_index >= 0 && left_sidebar_index < btnList.length;
//         if(!hasIndex){
//             // 仍需确保 hover 时图标跟随文字变红（为所有未绑定项补齐hover绑定）
//             for(var k=0;k<btnList.length;k++){
//                 bindHoverIconColor(btnList[k]);
//             }
//             return;
//         }

//         // 统一的选中与未选中样式（基于 Tailwind）
//         // 去掉外部边框
//         var activeBtnClasses = ['text-red-500','bg-[#18202b]'];
//         // var activeBtnClasses = ['text-red-500','bg-[#18202b]','outline','outline-1','outline-blue-500/35'];
//         var inactiveBtnBase = ['flex','items-center','gap-2','w-full','px-3','py-2','rounded-md'];
//         var inactiveColorClasses = ['text-slate-300','hover:bg-white/5','hover:text-red-500'];

//         // hover 时图标颜色跟随
//         function bindHoverIconColor(btn){
//             if(btn.getAttribute('data-hover-bound') === '1') return;
//             btn.setAttribute('data-hover-bound','1');
//             btn.addEventListener('mouseenter', function(){ try{ var s=btn.querySelector('svg'); if(s && !btn.classList.contains('text-red-500')){ s.classList.add('text-red-500'); } }catch(_){} });
//             btn.addEventListener('mouseleave', function(){ try{ var s=btn.querySelector('svg'); if(s && !btn.classList.contains('text-red-500')){ s.classList.remove('text-red-500'); s.classList.add('text-slate-400'); } }catch(_){} });
//         }

//         // 清除所有按钮的选中样式，并恢复未选中配色
//         for(var i=0;i<btnList.length;i++){
//             var btn = btnList[i];
//             // 去掉可能存在的选中样式
//             activeBtnClasses.forEach(function(c){ btn.classList.remove(c); });
//             // 确保基础布局类存在
//             inactiveBtnBase.forEach(function(c){ if(!btn.classList.contains(c)) btn.classList.add(c); });
//             // 恢复未选中配色
//             inactiveColorClasses.forEach(function(c){ if(!btn.classList.contains(c)) btn.classList.add(c); });

//             // 图标颜色：未选中为 text-slate-400
//             try{
//                 var svg = btn.querySelector('svg');
//                 if(svg){
//                     svg.classList.remove('text-red-500');
//                     if(!svg.classList.contains('text-slate-400')) svg.classList.add('text-slate-400');
//                 }
//             }catch(_){ }

//             // 绑定 hover 时图标变红
//             bindHoverIconColor(btn);
//         }

//         // 设置目标按钮为选中态
//         var target = btnList[left_sidebar_index];
//         if(target){
//             // 去掉未选中配色中的文字色，避免冲突
//             target.classList.remove('text-slate-300');
//             // 添加选中配色
//             activeBtnClasses.forEach(function(c){ if(!target.classList.contains(c)) target.classList.add(c); });

//             // 图标设为 red-500（选中态常驻）
//             try{
//                 var svg2 = target.querySelector('svg');
//                 if(svg2){
//                     svg2.classList.remove('text-slate-400');
//                     if(!svg2.classList.contains('text-red-500')) svg2.classList.add('text-red-500');
//                 }
//             }catch(_){ }
//         }
//     }catch(err){
//         console.error('[左侧选中态] 设置失败: ', err);
//     }
// }

// 绑定移动端菜单 - 内部函数
function bindMobileMenu(){
    var moreBtn = document.getElementById('id_btn_mobile_more');
    var mobileMenu = document.getElementById('id_mobile_menu');
    if(!moreBtn || !mobileMenu){ console.warn('【移动端菜单】未找到相关控件'); return; }
    
    // 切换菜单显示状态
    function toggleMenu(){
        var isHidden = mobileMenu.classList.contains('hidden');
        if(isHidden){
            mobileMenu.classList.remove('hidden');
            console.log('【移动端菜单】显示菜单');
        } else {
            mobileMenu.classList.add('hidden');
            console.log('【移动端菜单】隐藏菜单');
        }
    }
    
    // 绑定更多按钮点击事件
    moreBtn.addEventListener('click', function(e){
        e.stopPropagation();
        console.log('【移动端菜单】点击更多按钮');
        toggleMenu();
    });
    
    // 点击菜单外部关闭菜单
    document.addEventListener('click', function(e){
        if(!mobileMenu.contains(e.target) && !moreBtn.contains(e.target)){
            if(!mobileMenu.classList.contains('hidden')){
                mobileMenu.classList.add('hidden');
                console.log('【移动端菜单】点击外部关闭菜单');
            }
        }
    });
    
    // 监听窗口大小变化，在大屏幕时自动隐藏菜单
    window.addEventListener('resize', function(){
        if(window.innerWidth >= 1024 && !mobileMenu.classList.contains('hidden')){
            mobileMenu.classList.add('hidden');
            console.log('【移动端菜单】窗口变大，自动隐藏菜单');
        }
    });
    
    console.log('【移动端菜单】初始化完成');
}





