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


// 生成视频 按钮
id_btn_generate.addEventListener('click', function(){
    if(id_btn_generate.disabled) {
        return; // 如果按钮被禁用，不执行操作
    }

    showLoading();
    // 生成过程中禁用按钮
    setGenerateButtonState(false);

    startGenerateImage (GlobalConfig.TYPE_IMAGE_FLUX, "flux-kontext-pro");

});

/** ----------------------------------------------------------
 *  ----------------------- 生成图片 --------------------------
 *  ----------------------------------------------------------
 */
// nano 和 flux请求，只是请求参数和url不一样
// 包含了这两个模型的两种   (图片和纯文本) 生成
async function startGenerateImage (image_type, model_name) {

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
        
        // 收集表单数据（当前页面只有图生视频）
        var hasFile = file_input && file_input.files && file_input.files[0];

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
                        "opt": "0", // 0:generate_nano_image,   1: 图片转视频的时候veo这个opt不管用。
                        "uid": "188",
                        "project_id": "2",
                        "product_id": GlobalConfig.product_id,
                        "device_info": "6789",
                        "t": "0",
        };

        jsonData['prompt'] = prompt;
        // jsonData["model"] = model_name;

        formData.append('param', JSON.stringify(jsonData));
        console.log('请求的参数 :: ', JSON.stringify(jsonData));

        // 创建视频接口: VEO3 
        // const response = await fetch(GlobalConfig.url + "/go/v/cr", { method: 'POST', body: formData });
        
        let api_text = GlobalConfig.API_NANO;
        if (image_type == GlobalConfig.TYPE_IMAGE_NANO) {
            api_text = GlobalConfig.API_NANO;
        } else if (image_type == GlobalConfig.TYPE_IMAGE_FLUX) {
            api_text = GlobalConfig.API_FLUX;
        }

        // 创建 nano 的图片接口
        const response = await fetch("http://localhost:39603/tool/gen_img", { 
            method: 'POST', 
            body: formData
        });
        const result = await response.json();
        console.log("Processing result:", result);

        if (response.ok && result.code === 200) {
            // 兜底解析可播放地址
            var data = result.data || {};
            var url = data.result_url;
            console.log('url :: ', url);
            if (url) {
                showSuccess(url);

                if (data.jifen) {
                    console.log(`积分已更新: ${data.jifen}`);
                    refreshUserJifen (data.jifen);
                }

            } else {
                showError();
                alert('Generation succeeded but no playable url returned');
            }
        } else if (result.code === 1000018) {
            alert('Insufficient credits, please recharge');
            showError();
        } else {
            console.log(result.msg || 'Processing failed');
            showError();
            alert('Video generation failed: ' + (result.msg || 'Unknown error'));
        }
    } catch (error) {
        console.error('Processing failed:', error);
        showError();
        alert('Video generation failed: ' + error.message);
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
