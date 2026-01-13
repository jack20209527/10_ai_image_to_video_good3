/**
 * 多图片转视频 API 处理模块
 * 功能：处理多张图片上传、请求生成、轮询任务状态、显示结果
 * API 端点：http://localhost:39603/go/v_r_a
 */

console.log('【多图片转视频】API 模块已加载');

// ============================================================
// 1. 用户信息模拟（本地调试用）
// ============================================================
const mockUser = {
    uid: 239,
    username: 'test_user',
    credits: 1000
};

// 获取用户信息（优先从本地存储，否则使用模拟数据）
function getUserInfo() {
    try {
        const localUser = LocalStorageUtil.getUserObject();
        return localUser || mockUser;
    } catch (e) {
        return mockUser;
    }
}

/**
 * 提交多张图片生成视频（multipart/form-data 格式）
 */
async function submit() {
    try {
        // 验证
        const uploadedCount = uploadManager.getUploadedCount();
        if (uploadedCount === 0) {
            alert('Please upload at least one image');
            return;
        }
        
        const promptInput = document.getElementById('id_prompt_input');
        const prompt = promptInput ? promptInput.value.trim() : '';
        if (!prompt) {
            alert('Please enter a prompt');
            return;
        }
        
        // 禁用按钮，显示加载
        setGenerateButtonState(false);
        showLoading();
        
        const user = getUserInfo();
        const images = uploadManager.getUploadedImages();
        
        // 获取用户选择的视频设置
        const settings = getVideoSettings();
        
        // 构建 FormData（multipart/form-data 格式）
        const formData = new FormData();
        
        // 添加图片文件（base64 转 Blob）
        for (let i = 0; i < images.length; i++) {
            const base64 = images[i];
            const blob = base64ToBlob(base64);
            formData.append(`file${i}`, blob, `image_${i}.jpg`);
        }
        
        // 构建参数对象（使用界面选择的值）
        const paramData = {
            uid: user.uid,
            email: user.email || '',
            prompt: prompt,
            project_id: GlobalConfig.project_id,
            product_id: GlobalConfig.product_id,
            model: settings.model, // 模型类型：0=高级(Premium), 1=中级(Standard), 2=初级(Basic), 3=体验版(Trial)
            duration: settings.duration, // 视频时长：4, 8, 10 秒
            audio: true, // 是否启用语音输出
            aspect_ratio: settings.aspect_ratio, // 宽高比：16:9, 9:16, 4:3, 3:4, 1:1
            resolution: settings.resolution, // 分辨率：360p, 720p, 1080p
            opt: '3', // opt = '3' 表示参考图生语音视频
            t: '0', // 0=正式，1=测试，2=测试返回假数据
            need_wait: true, // 是否需要排队
            seed: 0, // 随机种子
            bgm: false // 是否启用背景音乐
        };
        
        // 添加参数为 FormItem
        formData.append('param', JSON.stringify(paramData));
        
        console.log('【提交图片】FormData 请求，图片数量:', images.length);
        console.log('【提交图片】请求参数:', {
            ...paramData,
            images: `[${images.length} images]`
        });
        
        // 发送 multipart/form-data 请求
        var url = 'http://localhost:39603/go/v_r_a'
        // url = GlobalConfig.url + "/go/v_r_a"
        const response = await fetch(url, {
            method: 'POST',
            body: formData
            // 注意：不要设置 Content-Type，浏览器会自动设置为 multipart/form-data
        });
        
        const result = await response.json();
        console.log('【提交图片】响应:', result);
        
        if (result.code === 200 && result.data) {
            const taskId = result.data.task_id;
            console.log('【提交图片】任务已创建，ID:', taskId);
            
            // 更新积分
            if (result.data.jifen) {
                console.log(`【积分更新】新积分: ${result.data.jifen}`);
                try {
                    refreshUserJifen(result.data.jifen);
                } catch (e) {
                    console.warn('【积分更新】失败:', e);
                }
            }
            
            // 启动轮询
            startTaskDetailLoop(taskId, 6, 100);
        } else if (result.code === 1000018) {
            console.log('【提交图片】积分不足');
            showError();
            alert('Insufficient credits, please recharge');
        } else {
            console.error('【提交图片】请求失败:', result.msg);
            showError();
            alert(result.msg || 'Failed to generate video');
        }
    } catch (error) {
        console.error('【提交图片】异常:', error);
        showError();
        alert('Error: ' + error.message);
    } finally {
        setGenerateButtonState(true);
    }
}


// ============================================================
// 2. 多图片上传管理器
// ============================================================
const uploadManager = {
    images: new Array(6).fill(null), // 存储 6 个图片的 base64
    
    /**
     * 初始化上传管理器
     */
    init() {
        const slots = document.querySelectorAll('.upload-slot');
        slots.forEach(slot => {
            const fileInput = slot.querySelector('.file-input');
            const removeBtn = slot.querySelector('.remove-btn');
            
            // 点击 slot 打开文件选择
            slot.addEventListener('click', (e) => {
                if (e.target !== removeBtn && !e.target.closest('.remove-btn')) {
                    fileInput.click();
                }
            });
            
            // 文件选择处理
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    this.handleFileSelect(file, slot);
                }
            });
            
            // 移除按钮
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeImage(slot);
            });
            
            // 拖拽支持
            slot.addEventListener('dragover', (e) => {
                e.preventDefault();
                slot.classList.add('border-blue-500/50', 'bg-blue-500/10');
            });
            
            slot.addEventListener('dragleave', () => {
                slot.classList.remove('border-blue-500/50', 'bg-blue-500/10');
            });
            
            slot.addEventListener('drop', (e) => {
                e.preventDefault();
                slot.classList.remove('border-blue-500/50', 'bg-blue-500/10');
                const file = e.dataTransfer.files[0];
                if (file && file.type.startsWith('image/')) {
                    this.handleFileSelect(file, slot);
                }
            });
        });
        
        console.log('【上传管理器】初始化完成');
    },
    
    /**
     * 处理文件选择
     * @param {File} file - 选中的文件
     * @param {HTMLElement} slot - 上传槽位元素
     */
    handleFileSelect(file, slot) {
        // 验证文件类型
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }
        
        // 验证文件大小（建议 < 2MB）
        if (file.size > 2 * 1024 * 1024) {
            alert('Image size should be less than 2MB');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const index = parseInt(slot.dataset.index);
            this.images[index] = e.target.result; // 保存 base64
            
            // 显示预览
            const preview = slot.querySelector('.upload-preview');
            const placeholder = slot.querySelector('.upload-placeholder');
            const removeBtn = slot.querySelector('.remove-btn');
            
            preview.src = e.target.result;
            preview.classList.remove('hidden');
            placeholder.classList.add('hidden');
            removeBtn.classList.remove('hidden');
            
            console.log(`【上传管理器】图片 ${index} 已加载`);
        };
        reader.readAsDataURL(file);
    },
    
    /**
     * 移除图片
     * @param {HTMLElement} slot - 上传槽位元素
     */
    removeImage(slot) {
        const index = parseInt(slot.dataset.index);
        this.images[index] = null;
        
        const preview = slot.querySelector('.upload-preview');
        const placeholder = slot.querySelector('.upload-placeholder');
        const removeBtn = slot.querySelector('.remove-btn');
        const fileInput = slot.querySelector('.file-input');
        
        preview.classList.add('hidden');
        placeholder.classList.remove('hidden');
        removeBtn.classList.add('hidden');
        fileInput.value = '';
        
        console.log(`【上传管理器】图片 ${index} 已移除`);
    },
    
    /**
     * 获取已上传的图片数组
     * @returns {Array} base64 图片数组
     */
    getUploadedImages() {
        return this.images.filter(img => img !== null);
    },
    
    /**
     * 获取已上传的图片数量
     * @returns {number} 图片数量
     */
    getUploadedCount() {
        return this.images.filter(img => img !== null).length;
    }
};

// ============================================================
// 3. 生成按钮状态管理
// ============================================================

/**
 * 设置生成按钮的启用/禁用状态
 * @param {boolean} enabled - 是否启用
 */
function setGenerateButtonState(enabled) {
    const btn = document.getElementById('id_btn_generate');
    if (!btn) return;
    
    if (enabled) {
        // 启用状态：可点击
        btn.disabled = false;
        btn.classList.remove('opacity-50', 'cursor-not-allowed');
        btn.classList.add('hover:shadow-lg', 'transition-all');
        console.log('【生成按钮】已启用');
    } else {
        // 禁用状态：不可点击
        btn.disabled = true;
        btn.classList.add('opacity-50', 'cursor-not-allowed');
        btn.classList.remove('hover:shadow-lg');
        console.log('【生成按钮】已禁用');
    }
}

/**
 * 检查是否可以生成（有图片 + 有提示词）
 */
function checkCanGenerate() {
    const hasImages = uploadManager.getUploadedCount() > 0;
    const promptInput = document.getElementById('id_prompt_input');
    const hasPrompt = promptInput && promptInput.value.trim().length > 0;
    
    setGenerateButtonState(hasImages && hasPrompt);
}

// ============================================================
// 4. 加载和结果显示
// ============================================================

/**
 * 显示加载状态
 */
function showLoading() {
    const loadingLayout = document.getElementById('id_loading_layout');
    const previewImage = document.getElementById('id_preview_image');
    const previewVideo = document.getElementById('id_preview_video');
    const resultError = document.getElementById('id_result_error');
    
    if (previewImage) previewImage.classList.add('hidden');
    if (previewVideo) previewVideo.classList.add('hidden');
    if (resultError) resultError.classList.add('hidden');
    if (loadingLayout) loadingLayout.classList.remove('hidden');
    
    console.log('【显示状态】加载中...');
}

/**
 * 显示错误状态
 */
function showError() {
    const loadingLayout = document.getElementById('id_loading_layout');
    const previewImage = document.getElementById('id_preview_image');
    const previewVideo = document.getElementById('id_preview_video');
    const resultError = document.getElementById('id_result_error');
    
    if (previewImage) previewImage.classList.add('hidden');
    if (previewVideo) previewVideo.classList.add('hidden');
    if (loadingLayout) loadingLayout.classList.add('hidden');
    if (resultError) resultError.classList.remove('hidden');
    
    console.log('【显示状态】错误');
}

/**
 * 显示成功状态（视频或图片）
 * @param {string} url - 媒体 URL
 */
function showSuccess(url) {
    const loadingLayout = document.getElementById('id_loading_layout');
    const previewImage = document.getElementById('id_preview_image');
    const previewVideo = document.getElementById('id_preview_video');
    const resultError = document.getElementById('id_result_error');
    
    if (loadingLayout) loadingLayout.classList.add('hidden');
    if (resultError) resultError.classList.add('hidden');
    
    // 判断是视频还是图片
    const isVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
    
    if (isVideo) {
        if (previewImage) previewImage.classList.add('hidden');
        if (previewVideo) {
            previewVideo.classList.remove('hidden');
            // 更新视频源
            previewVideo.innerHTML = '';
            const source = document.createElement('source');
            source.src = url;
            source.type = 'video/mp4';
            previewVideo.appendChild(source);
            previewVideo.load();
        }
    } else {
        if (previewVideo) previewVideo.classList.add('hidden');
        if (previewImage) {
            previewImage.src = url;
            previewImage.classList.remove('hidden');
        }
    }
    
    console.log('【显示状态】成功，URL:', url);
}

// ============================================================
// 5. 任务轮询管理
// ============================================================

let taskDetailTimer = null;
let taskDetailCount = 0;

/**
 * 启动任务详情轮询
 * @param {string} taskId - 任务 ID
 * @param {number} intervalSeconds - 轮询间隔（秒）
 * @param {number} maxCount - 最大轮询次数
 */
function startTaskDetailLoop(taskId, intervalSeconds = 6, maxCount = 100) {
    stopTaskDetailLoop();
    
    console.log(`【任务轮询】启动，间隔 ${intervalSeconds}s，最多 ${maxCount} 次`);
    
    taskDetailCount = 0;
    
    // 立即执行一次
    getVideoTaskDetail(taskId);
    
    // 设置定时器
    taskDetailTimer = setInterval(() => {
        taskDetailCount++;
        console.log(`【任务轮询】第 ${taskDetailCount}/${maxCount} 次`);
        
        if (taskDetailCount >= maxCount) {
            console.log('【任务轮询】达到最大次数，停止');
            stopTaskDetailLoop();
            showError();
            return;
        }
        
        getVideoTaskDetail(taskId);
    }, intervalSeconds * 1000);
}

/**
 * 停止任务轮询
 */
function stopTaskDetailLoop() {
    if (taskDetailTimer) {
        clearInterval(taskDetailTimer);
        taskDetailTimer = null;
        console.log('【任务轮询】已停止');
    }
}

// ============================================================
// 6. API 请求函数
// ============================================================

/**
 * 获取任务详情
 * @param {string} taskId - 任务 ID
 */
async function getVideoTaskDetail(taskId) {
    try {
        const user = getUserInfo();
        
        const requestData = {
            uid: user.uid,
            task_id: taskId,
            project_id: GlobalConfig.project_id,
            product_id: GlobalConfig.product_id,
            my_t: "1"
        };
        
        console.log('【获取任务详情】请求参数:', requestData);
        
        var url = 'http://localhost:39603/go/v_r_a/get_task_detail'
        // url = GlobalConfig.url + "/go/v_r_a/get_task_detail"
        const response = await fetch( url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        
        const result = await response.json();
        console.log('【获取任务详情】响应:', result);
        
        if (result.code === 200 && result.data) {
            const data = result.data;
            const status = data.status; // "0":生成中，"1":成功，"2":失败
            
            if (status === '1') {
                // 生成成功
                console.log('【任务轮询】生成成功');
                stopTaskDetailLoop();
                
                if (data.video_url) {
                    showSuccess(data.video_url);
                    
                    // 更新积分
                    if (data.credits) {
                        console.log(`【积分更新】新积分: ${data.credits}`);
                        try {
                            refreshUserJifen(data.credits);
                        } catch (e) {
                            console.warn('【积分更新】失败:', e);
                        }
                    }
                } else {
                    console.warn('【任务轮询】视频 URL 为空');
                    showError();
                }
            } else if (status === '2') {
                // 生成失败
                console.log('【任务轮询】生成失败');
                stopTaskDetailLoop();
                showError();
            } else {
                // 生成中，继续轮询
                console.log('【任务轮询】生成中...');
            }
        } else if (result.code === 1000018) {
            // 积分不足
            console.log('【任务轮询】积分不足');
            stopTaskDetailLoop();
            showError();
        } else {
            console.error('【任务轮询】请求失败:', result.msg);
            stopTaskDetailLoop();
            showError();
        }
    } catch (error) {
        console.error('【任务轮询】异常:', error);
        stopTaskDetailLoop();
        showError();
    }
}

/**
 * 将 base64 转换为 Blob
 * @param {string} base64String - base64 字符串
 * @returns {Blob} Blob 对象
 */
function base64ToBlob(base64String) {
    // 处理 data:image/xxx;base64, 前缀
    const base64Data = base64String.includes(',') ? base64String.split(',')[1] : base64String;
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'image/jpeg' });
}


// ============================================================
// 7. 页面初始化
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('【页面初始化】开始');
    
    // 初始化上传管理器
    uploadManager.init();
    
    // 初始化按钮状态
    setGenerateButtonState(false);
    
    // 监听提示词输入
    const promptInput = document.getElementById('id_prompt_input');
    if (promptInput) {
        promptInput.addEventListener('input', checkCanGenerate);
        promptInput.addEventListener('change', checkCanGenerate);
        console.log('【提示词监听】已绑定');
    }
    
    // 绑定生成按钮
    const generateBtn = document.getElementById('id_btn_generate');
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            if (!generateBtn.disabled) {
                submit();
            }
        });
        console.log('【生成按钮】已绑定');
    }

    // 初始化宽高比选项组（保留原有的按钮组交互）
    initOptionGroup('ratio', 'id_group_aspect_ratio', 'id_input_aspect_ratio', 'ratio-item');

    console.log('【页面初始化】完成');
});

/**
 * 初始化选项组的点击事件
 * @param {string} name - 选项组名称（用于日志）
 * @param {string} groupId - 选项组容器 ID
 * @param {string} inputId - 隐藏输入框 ID
 * @param {string} itemClass - 选项按钮的 class
 */
function initOptionGroup(name, groupId, inputId, itemClass) {
    const group = document.getElementById(groupId);
    const input = document.getElementById(inputId);
    if (!group || !input) return;
    
    const items = group.querySelectorAll('.' + itemClass);
    
    items.forEach(item => {
        item.addEventListener('click', () => {
            const value = item.dataset.value;
            input.value = value;
            
            // 更新选中样式
            items.forEach(btn => {
                btn.classList.remove('bg-purple-500/20', 'border-purple-500/50', 'text-purple-300');
                btn.classList.add('bg-white/5', 'border-white/10', 'text-gray-300');
                
                // 更新子元素颜色
                const subText = btn.querySelector('.text-purple-400');
                if (subText) {
                    subText.classList.remove('text-purple-400');
                    subText.classList.add('text-gray-500');
                }
            });
            
            item.classList.remove('bg-white/5', 'border-white/10', 'text-gray-300');
            item.classList.add('bg-purple-500/20', 'border-purple-500/50', 'text-purple-300');
            
            // 更新选中项的子元素颜色
            const subText = item.querySelector('.text-gray-500');
            if (subText) {
                subText.classList.remove('text-gray-500');
                subText.classList.add('text-purple-400');
            }
            
            console.log(`【${name}选择】已选择: ${value}`);
        });
    });
    
    console.log(`【${name}选项组】初始化完成`);
}

/**
 * 获取当前选择的视频设置
 * @returns {Object} 视频设置对象
 * model: 0=高级(Premium), 1=中级(Standard), 2=初级(Basic), 3=体验版(Trial)
 * duration: 4, 8, 10 (秒)
 * aspect_ratio: 16:9, 9:16, 4:3, 3:4, 1:1
 * resolution: 360p, 720p, 1080p
 */
function getVideoSettings() {
    return {
        model: document.getElementById('id_input_model')?.value || '0',
        duration: parseInt(document.getElementById('id_input_duration')?.value || '4'),
        aspect_ratio: document.getElementById('id_input_aspect_ratio')?.value || '16:9',
        resolution: document.getElementById('id_input_resolution')?.value || '360p'
    };
}

// ============================================================
// 8. 工具函数（兼容现有代码）
// ============================================================

/**
 * 刷新用户积分（兼容现有代码）
 * @param {number} newCredits - 新积分
 */
function refreshUserJifen(newCredits) {
    try {
        // 尝试更新本地存储
        if (typeof LocalStorageUtil !== 'undefined' && LocalStorageUtil.setUserObject) {
            const user = LocalStorageUtil.getUserObject() || mockUser;
            user.credits = newCredits;
            LocalStorageUtil.setUserObject(user);
        }
        
        // 尝试更新页面显示
        const creditDisplay = document.querySelector('[data-credit-display]');
        if (creditDisplay) {
            creditDisplay.textContent = newCredits;
        }
        
        console.log(`【积分更新】成功，新积分: ${newCredits}`);
    } catch (e) {
        console.warn('【积分更新】异常:', e);
    }
}
