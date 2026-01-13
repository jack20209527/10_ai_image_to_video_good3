// my_v_api.js

console.log('开始执行js代码 ....');

// Input method
let upload_card = document.getElementById('upload_card');

// Upload
let file_input = document.getElementById('file_input');

// 生成视频
const id_btn_generate = document.getElementById('id_btn_generate');
const id_btn_model = document.getElementById('id_btn_model');
const id_preview_image = document.getElementById('id_preview_image');
const id_preview_video = document.getElementById('id_preview_video');
const id_result_error = document.getElementById('id_result_error');
const id_loading_layout = document.getElementById('id_loading_layout');

upload_card.addEventListener('dragover',e=>{e.preventDefault();upload_card.classList.add('ring-2','ring-blue-500/40')});
upload_card.addEventListener('dragleave',()=>upload_card.classList.remove('ring-2','ring-blue-500/40'));
upload_card.addEventListener('drop',e=>{e.preventDefault();upload_card.classList.remove('ring-2','ring-blue-500/40'); if(e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);});
file_input.addEventListener('change',e=>{if(e.target.files[0]) handleFile(e.target.files[0]);});

function handleFile(file){
    if(!file || !file.type || !file.type.startsWith('image/')) return;
    // 显示预览
    const url = URL.createObjectURL(file);
    const preview = document.getElementById('uploadPreview');
    const btnRemove = document.getElementById('id_btn_remove_upload');
    const uploadDefault = document.getElementById('uploadDefault');
    if(preview && btnRemove && uploadDefault){
        preview.src = url;
        preview.classList.remove('hidden');
        btnRemove.classList.remove('hidden');
        uploadDefault.classList.add('hidden');
    }
}


// 绑定宽高比选择
function bindAspectRatioSelect(){
    // 容器、隐藏域
    var group = document.getElementById('id_group_aspect_ratio');
    var input = document.getElementById('id_input_aspect_ratio');
    if(!group || !input){ console.warn('【宽高比初始化】未找到控件'); return; }
    var items = group.querySelectorAll('.ar-item');

    // 切换选中样式的函数
    function setActive(target){
        for(var i=0;i<items.length;i++){
            items[i].classList.remove('ar-active','ring-2','ring-red-500/30','border-red-500/40');
            // 将文字与占位颜色恢复（默认灰色）
            var label = items[i].querySelector('.ar-label');
            var block = items[i].querySelector('.ar-block');
            if(label){ label.classList.remove('text-red-400','font-semibold'); label.classList.add('text-gray-300'); }
            if(block){ block.classList.remove('bg-red-500'); block.classList.add('bg-white/10'); }
        }
        target.classList.add('ar-active','ring-2','ring-red-500/30','border-red-500/40');
        var label2 = target.querySelector('.ar-label');
        var block2 = target.querySelector('.ar-block');
        if(label2){ label2.classList.remove('text-gray-300'); label2.classList.add('text-red-400','font-semibold'); }
        if(block2){ block2.classList.remove('bg-white/10'); block2.classList.add('bg-red-500'); }
    }

    // 绑定点击事件
    for(var j=0;j<items.length;j++){
        (function(el){
            el.addEventListener('click', function(){
                var val = el.getAttribute('data-value');
                input.value = val; // 写入隐藏域
                setActive(el);    // 切换高亮
                console.log('【宽高比变更】新值 =', val);
            });
        })(items[j]);
    }

    // 根据隐藏域初始值设置一次选中
    var init = input.value || '9:16';
    for(var k=0;k<items.length;k++){
        if(items[k].getAttribute('data-value') === init){ setActive(items[k]); break; }
    }
    console.log('【宽高比初始化】完成，默认 =', input.value);
}

bindAspectRatioSelect (); 

// 生成视频 按钮
id_btn_generate.addEventListener('click', function(){
    if(id_btn_generate.disabled) {
        return; // 如果按钮被禁用，不执行操作
    }

    showLoading();
    // 生成过程中禁用按钮
    setGenerateButtonState(false);
     
    var model = id_btn_model.innerText;
    // 0:veo3  1:veo3-fast 2:veo3-pro
    if (model == "Google Veo3") {
        startGenerateVideoByVeo3 ("0");
    } else if (model == "Google Veo3 Fast") {
        startGenerateVideoByVeo3 ("1");
    } else if (model == "Google Veo3 Pro") {
        startGenerateVideoByVeo3 ("2");
    }  else if (model == "On-premise Model") {
        startGenerateVideoByV (GlobalConfig.TYPE_VIDEO_V_TEXT_TO_VIDEO);
    }
     
    //  static TYPE_VIDEO_V_IMAGE_TO_VIDEO = "0";
    //  static TYPE_VIDEO_V_TEXT_TO_VIDEO = "1";
    //  static TYPE_VIDEO_V_TEMPLATE_TO_VIDEO = "2";
     // startGenerateVideoByV (GlobalConfig.TYPE_VIDEO_V_IMAGE_TO_VIDEO);

});

/** ----------------------------------------------------------
 *  ----------------------- 生成视频 --------------------------
 *  ----------------------------------------------------------
 */
// 生成 v 视频的，只是请求参数和url不一样
async function startGenerateVideoByV(image_type) {
    // 仅图片生成视频面板
    if (!isLoggedIn) { 
        window.open('/login', '_self');
        return; 
    }

    try {
        // 获取提示词
        var prompt_temp = document.getElementById('id_prompt_input');
        var prompt = prompt_temp ? prompt_temp.value.trim() : '';
        // prompt = "The woman in Figure 2 is wearing the necklace from Figure 1,Do not change the details of other Figure 2."
        // 生成美女图片
        // prompt = "让这个美女微笑，伸出手来，动作可以夸张点，表情也可以夸张点，类似哈哈大笑那种"
        if (!prompt) { 
            alert('Please enter a prompt'); 
            return; 
        }
        
        // 收集表单数据（当前页面只有图生视频）
        var hasFile = file_input && file_input.files && file_input.files[0];
        // var aspect_ratio_temp = document.getElementById('id_input_aspect_ratio');
        // var aspectRatio = aspect_ratio_temp ? aspect_ratio_temp.value : '';
        // var resolution = (document.getElementById('id_text_resolution')||{}).innerText || '';
        // var duration = (document.getElementById('id_text_duration')||{}).innerText || '';

        // 显示加载状态
        LoadingUtil.show('Generating', 'AI is creating your product, please wait...');

        // 准备表单数据
        const formData = new FormData();

        let jsonData = {
                        "uid": localUser ? localUser.uid : 0,
                        "project_id": GlobalConfig.project_id,
                        "product_id": GlobalConfig.product_id,
                        "device_info": "6789",
                        "t": "0",
        };
        // 1. 文
        if (image_type == GlobalConfig.TYPE_VIDEO_V_TEXT_TO_VIDEO) {
            jsonData['opt'] = "1";
            jsonData['prompt'] = prompt;
            jsonData['model'] = "2";
            jsonData['style'] = "general"; // anime
            jsonData['aspect_ratio'] = "16:9"; // Defaults to 16:9, accepted: 16:9 9:16 1:1
            jsonData['need_wait'] = true;  // 需要等待
            jsonData['my_seed'] = 0;  // 默认是0
            jsonData['bgm'] = true;  // 默认是false
        } 
        // 2. 图
        else if (image_type == GlobalConfig.TYPE_VIDEO_V_IMAGE_TO_VIDEO) {
            jsonData['opt'] = "0";
            jsonData["prompt"] = prompt;
            jsonData['model'] = "2";
            jsonData['need_wait'] = true;  // 需要等待
            jsonData['my_seed'] = 0;  // 默认是0
            jsonData['bgm'] = true;  // 默认是false

            // 如果是图生图，就要判断这个
            if (!hasFile) { 
                alert('Please upload a reference image'); 
                return; 
            }
            formData.append('file', file_input.files[0]);
            console.log("图片已选择并添加到 FormData");
        } 
        // 3. 模版
        else if (image_type == GlobalConfig.TYPE_VIDEO_V_TEMPLATE_TO_VIDEO) {
            jsonData['opt'] = "2";
            jsonData["prompt"] = prompt;
            jsonData['aspect_ratio'] = "16:9"; // Defaults to 16:9, accepted: 16:9 9:16 1:1
            jsonData['template'] = "";  // 这个模版名字不能为空
            jsonData['need_wait'] = true;  // 需要等待
            jsonData['my_seed'] = 0;  // 默认是0
            jsonData['bgm'] = true;  // 默认是false

            if (!hasFile) { 
                alert('Please upload a reference image'); 
                return; 
            }
            formData.append('file', file_input.files[0]);
            console.log("图片已选择并添加到 FormData");
        }

        formData.append('param', JSON.stringify(jsonData));

        console.log('请求的参数 :: ', JSON.stringify(jsonData));

        // 创建视频接口: VEO3 
        // const response = await fetch(GlobalConfig.url + "/go/v/cr", { method: 'POST', body: formData });
        
        let api_text = GlobalConfig.API_V_VIDEO;
 
        // 创建 nano 的图片接口
        const response = await fetch(GlobalConfig.url + api_text, { 
            method: 'POST', 
            body: formData
        });
        const result = await response.json();
        console.log("Processing result:", result);

        if (response.ok && result.code === 200) {
            // 兜底解析可播放地址
            var data = result.data || {};
            var task_id = data.task_id;
            console.log('task_id :: ', task_id);

            var new_jifen = data.jifen;
            if (new_jifen) {
                console.log(`积分已更新: ${new_jifen}`);
                refreshUserJifen (new_jifen);
            }

            // let task_id = "859077633999118336"
            // 开始循环请求任务详情，间隔3秒，最多请求20次
            startTaskDetailLoop(task_id, 6, 100); // 10分钟，100次，间隔6秒

        } else if (result.code === 1000018) {
            console.log ('Insufficient credits, please recharge');
            showError();
        } else {
            console.log(result.msg || 'Processing failed');
            showError();
            console.log('Video generation failed: ' + (result.msg || 'Unknown error'));
        }
    } catch (error) {
        console.error('Processing failed:', error);
        showError();
        console.log ('Video generation failed: ' + error.message);
    } finally {
        LoadingUtil.hide();
        setGenerateButtonState(true);
    }
}

       // 循环请求任务详情的定时器ID
var taskDetailTimer = null;
var taskDetailCount = 0; // 当前请求次数

// 循环获取任务详情的函数
function startTaskDetailLoop(task_id, intervalSeconds = 6, maxCount = 20) {
    // 停止之前的循环
    stopTaskDetailLoop();
    
    console.log(`【任务详情循环】开始循环请求，间隔${intervalSeconds}秒，最大次数${maxCount}次`);
    
    // 重置计数器
    taskDetailCount = 0;
    
    // 立即执行一次
    getVideoTaskDetail(task_id);
    
    // 设置定时器循环执行
    taskDetailTimer = setInterval(function() {
        taskDetailCount++;
        console.log(`【任务详情循环】第${taskDetailCount}次请求`);
        
        // 检查是否超过最大次数
        if (taskDetailCount >= maxCount) {
            console.log(`【任务详情循环】达到最大次数${maxCount}，停止循环`);
            stopTaskDetailLoop();
            return;
        }
        
        // 执行请求
        getVideoTaskDetail(task_id);

    }, intervalSeconds * 1000);
}

// 停止循环请求的函数
function stopTaskDetailLoop() {
    if (taskDetailTimer) {
        clearInterval(taskDetailTimer);
        taskDetailTimer = null;
        console.log(`【任务详情循环】已停止循环请求`);
    }
}

// 获取任务详情的函数（修改为支持循环控制）
async function getVideoTaskDetail(task_id) {
    // 仅图片生成视频面板
    if (!isLoggedIn) { 
        window.open('/login', '_self');
        return; 
    }

    try {
        console.log("开始获取任务详情了.")

        let localUser = LocalStorageUtil.getUserObject();
        console.log('localUser: ', localUser);
        console.log(localUser == null);

        let jsonData = {
                        "opt": "0", // 3:图生视频  2:文生视频
                        "uid": localUser ? localUser.uid : 0,
                        "project_id": GlobalConfig.project_id,
                        "product_id": GlobalConfig.product_id,
                        "device_info": "6789",
                        "t": "0",
                        "task_id": task_id,
        };

        const jsonString = JSON.stringify(jsonData);
        console.log("请求的参数 :: " + jsonString);

        let api_text = GlobalConfig.API_GET_V_TASK_DETAIL;

                       // 创建 nano 的图片接口
        const response = await fetch(GlobalConfig.url + api_text, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonString
        });
        const result = await response.json();
        console.log("Processing result:", result);

        if (response.ok && result.code === 200) {
            // 兜底解析可播放地址
            var data = result.data || {};

            var status = data.status; // "0":生成中，"1":成功，"2":失败
            var task_id_temp = data.task_id;
            var video_url = data.video_url;

            console.log('status :: ', status);
            console.log('task_id_temp :: ', task_id_temp);
            console.log('video_url :: ', video_url);
            
            // 检查状态，如果生成成功则停止循环
            if (status === "1") {
                console.log("【任务详情循环】生成成功，停止循环请求");
                stopTaskDetailLoop();
                
                if (video_url) {
                    showSuccess(video_url);

                    if (data.jifen) {
                        console.log(`积分已更新: ${data.jifen}`);
                        refreshUserJifen(data.jifen);
                    }
                } else {
                    showError();
                    console.log("播放地址为空了")
                }
            } else if (status === "2") {
                // 生成失败，停止循环
                console.log("【任务详情循环】生成失败，停止循环请求");
                stopTaskDetailLoop();
                showError();
            } else {
                // status === "0" 生成中，继续循环
                console.log("【任务详情循环】生成中，继续等待...");
            }
        } else if (result.code === 1000018) {
            showError();
            console.log("金额不足")
            stopTaskDetailLoop();
        } else {
            showError();
            console.log(result.msg || 'Processing failed');
            stopTaskDetailLoop();
        }

    } catch (error) {
        console.error('Processing failed:', error);
        showError();
        alert('Video generation failed: ' + error.message);
        stopTaskDetailLoop();
    } finally {
        LoadingUtil.hide();
        console.log("获取任务详情完成");
        // setGenerateButtonState(true); // 这里不启用，因为生成视频按钮已经禁用了
    }
}

/** ----------------------------------------------------------
 *  ----------------------- 生成视频: VEO3 ---------------------
 *  ----------------------------------------------------------
 */
// veo3 只能文生视频
async function startGenerateVideoByVeo3 (model_number) {
    // 仅图片生成视频面板
    if (!isLoggedIn) { 
        window.open('/login', '_self');
        return; 
    }

    try {
        // 获取提示词
        var prompt_temp = document.getElementById('id_prompt_input');
        var prompt = prompt_temp ? prompt_temp.value.trim() : '';
        // prompt = "The woman in Figure 2 is wearing the necklace from Figure 1,Do not change the details of other Figure 2."
        // 生成美女图片
        // prompt = "A beautiful curvy woman with fair skin, realistic, detailed, high resolution, soft studio lighting, ultra-realistic photo."
        if (!prompt) { 
            alert('Please enter a prompt'); 
            return; 
        }

        // 显示加载状态
        LoadingUtil.show('Generating', 'AI is creating your product, please wait...');

        // 准备表单数据
        const formData = new FormData();

        // 检查是否有文件被选择
        if (hasFile) {
            formData.append('file', file_input.files[0]);
            console.log("图片已选择并添加到 FormData");
        } else {
            console.log("没有选择图片，使用提示词生成");
        }

        let jsonData = {
                        "opt": "0", // veo3没作用
                        "prompt": prompt,
                        "model": model_number, // 0:veo3  1:veo3-fast 2:veo3-pro
                        "uid": localUser ? localUser.uid : 0,
                        "project_id": GlobalConfig.project_id,
                        "product_id": GlobalConfig.product_id,
                        "device_info": "6789",
                        "t": "0",
        };

        formData.append('param', JSON.stringify(jsonData));

        console.log('请求的参数 :: ', JSON.stringify(jsonData));

        // 创建视频接口: VEO3 
        const response = await fetch(GlobalConfig.url + GlobalConfig.API_VEO3, 
        { 
            method: 'POST', 
            body: formData 

        });

        const result = await response.json();
        console.log("Processing result:", result);

        if (response.ok && result.code === 200) {
            // 兜底解析可播放地址
            var data = result.data || {};
            var url = data.result_url;
            console.log('返回的veo视频的url :: ', url);
            if (url) {
                showSuccess(url);

                if (data.jifen) {
                    console.log(`积分已更新: ${data.jifen}`);
                    refreshUserJifen (data.jifen);
                }

            } else {
                showError();
                console.log('Generation succeeded but no playable url returned');
            }
        } else if (result.code === 1000018) {
            alert('Insufficient credits, please recharge');
            showError();
        } else {
            console.log(result.msg || 'Processing failed');
            showError();
            console.log('Video generation failed: ' + (result.msg || 'Unknown error'));
        }
    } catch (error) {
        console.error('Processing failed:', error);
        showError();
        console.log('Video generation failed: ' + error.message);
    } finally {
        LoadingUtil.hide();
        setGenerateButtonState(true);
    }
}


// ------- 生成状态模拟（仅控制右侧已有容器，不改其他逻辑） -------
function showLoading(){
    hideAll ();
    id_loading_layout.classList.remove('hidden');
}
function showError(){
    hideAll ();
    id_result_error.classList.remove('hidden');
}
function showSuccess(url){
    // 先隐藏所有，再根据 是图片还是视频来动态显示
    hideAll();
    var isVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
    if(isVideo){
        try{ id_preview_video.innerHTML=''; var s=document.createElement('source'); s.src=url; s.type='video/mp4'; id_preview_video.appendChild(s); id_preview_video.load(); }catch(_){ }
        id_preview_video.classList.remove('hidden');
    }else{
        id_preview_image.src = url;
        id_preview_image.classList.remove('hidden');
    }
}

function hideAll(){
    id_preview_image.classList.add('hidden');
    id_preview_video.classList.add('hidden');
    id_result_error.classList.add('hidden');
    id_loading_layout.classList.add('hidden');
}
// ------- 生成状态 -------

// 设置生成按钮状态的函数
function setGenerateButtonState(enabled) {
    var btn = document.getElementById('id_btn_generate');
    if(!btn) return;
    
    if(enabled) {
        // 启用状态：可点击，渐变按钮启用 hover 过渡
        btn.disabled = false;
        btn.classList.remove('opacity-50', 'cursor-not-allowed', 'bg-gray-600', 'text-gray-400');
        btn.classList.add('text-white', 'hover:from-purple-500', 'hover:to-red-500');
    } else {
        // 禁用状态：不可点击，无 hover，置灰
        btn.disabled = true;
        btn.classList.add('opacity-100', 'cursor-not-allowed', 'bg-gray-600', 'text-gray-400');
        btn.classList.remove('text-white', 'hover:from-purple-500', 'hover:to-red-500');
    }
}

// 页面加载完成后，默认禁用按钮
document.addEventListener('DOMContentLoaded', function() {
    setGenerateButtonState(false);
    
    // 监听提示词输入框，根据内容动态设置按钮状态
    var promptInput = document.getElementById('id_prompt_input');
    if(promptInput) {
        // 初始检查一次
        checkPromptInput();
        
        // 实时监听所有可能的输入事件
        promptInput.addEventListener('input', checkPromptInput);
        promptInput.addEventListener('keyup', checkPromptInput);
        promptInput.addEventListener('keydown', checkPromptInput);
        promptInput.addEventListener('paste', checkPromptInput);
        promptInput.addEventListener('cut', checkPromptInput);
        promptInput.addEventListener('change', checkPromptInput);
        
        // 添加中文日志，方便调试
        console.log('【提示词监听】已绑定实时监听事件');
    } else {
        console.warn('【提示词监听】未找到输入框元素');
    }
});

// 检查提示词输入框内容的函数
function checkPromptInput() {
    var promptInput = document.getElementById('id_prompt_input');
    if(!promptInput) return;
    
    var content = promptInput.value.trim(); // 去除首尾空格
    var hasContent = content.length > 0;
    
    if(hasContent) {
        // 有内容时启用按钮
        setGenerateButtonState(true);
        console.log('【提示词监听】检测到内容，启用生成按钮');
    } else {
        // 无内容时禁用按钮
        setGenerateButtonState(false);
        console.log('【提示词监听】内容为空，禁用生成按钮');
    }
}

// 点击上传区域/按钮，触发系统选择
upload_card.addEventListener('click', function(e){
    // 避免点击移除按钮时也触发
    if(e.target && (e.target.id === 'id_btn_remove_upload')) return;
    file_input && file_input.click();
});

// 移除按钮：恢复默认样式
(function(){
    var btnRemove = document.getElementById('id_btn_remove_upload');
    var preview = document.getElementById('uploadPreview');
    var uploadDefault = document.getElementById('uploadDefault');
    if(btnRemove){
        btnRemove.addEventListener('click', function(e){
            e.stopPropagation();
            // 清空文件并还原
            try{ file_input.value = ''; }catch(_){ }
            if(preview){ preview.src=''; preview.classList.add('hidden'); }
            if(uploadDefault){ uploadDefault.classList.remove('hidden'); }
            btnRemove.classList.add('hidden');
        });
    }
})();
