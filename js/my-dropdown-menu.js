/**
 * 下拉菜单工具类
 *         // DropdownMenuUtil.init('someButton', ['选项1', '选项2', '选项3'], 0, 16, 200, (item, index) => {
 *         // console.log(`选择了: ${item}, 索引: ${index}`);
 *         // }); // 这里加上结束括号和分号
 */
// 确保类被正确定义为全局变量
window.DropdownMenuUtil = class DropdownMenuUtil {
    constructor() {
        this.activeMenu = null;
        this.outsideClickHandler = null;
        this.onHideCallback = null; // 弹窗关闭回调
    }

    static instance = null;

    static getInstance() {
        if (!DropdownMenuUtil.instance) {
            DropdownMenuUtil.instance = new DropdownMenuUtil();
        }
        return DropdownMenuUtil.instance;
    }
    /**
     * 初始化下拉菜单
     */
    static init(buttonId, menuItems, offsetX = 0, offsetY = 4, width = 192, onSelect = null, onHide = null) {
        // 移除 DOMContentLoaded 事件监听
        const button = document.getElementById(buttonId);
        if (button) {
            console.log(`[Init] 找到目标按钮，添加点击事件监听器: ${buttonId}`);
            button.addEventListener('click', () => {
                console.log(`[Button] ${buttonId} 被点击`);
                DropdownMenuUtil.getInstance().show(buttonId, menuItems, {
                    offsetX,
                    offsetY,
                    width,
                    onSelect,
                    onHide
                });
            });
        } else {
            console.error(`[Init] 错误：未找到ID为"${buttonId}"的按钮`);
        }
    }



// 按钮与弹窗之间的垂直间隙也保持“焦点”
// 在下拉显示时，创建一块透明“桥接层”（fixed div），覆盖按钮底部到弹窗顶部的 offsetY 缝隙，并额外+6px 容错。
// 鼠标在按钮、桥接层、弹窗三者任一上方时都会持续保持显示；离开三者后才会在150ms后隐藏。
// 清理时在 hide() 中移除桥接层与事件，避免残留。
// 快速从“AI 视频”移到“AI 图片”也能稳定显示
// show() 里若已有菜单，不再 return，而是先 hide 再继续创建新菜单，实现无缝切换；确保新目标菜单一定显示。
// 现有 onHide 回调和箭头复位不受影响。
// 这样：
// 悬停按钮→弹窗显示；在按钮/弹窗/中间缝隙移动都不会抖动或瞬隐。
// 从一个按钮快速移到另一个按钮，前一个菜单关闭，后一个菜单能立刻显示。
    // 新增：与 init 一致签名的直接显示方法（便于鼠标悬停等场景手动控制）
    static show(buttonId, menuItems, offsetX = 0, offsetY = 4, width = 192, onSelect = null, onHide = null){
        try{
            DropdownMenuUtil.getInstance().show(buttonId, menuItems, {
                offsetX, offsetY, width, onSelect, onHide
            });
        }catch(_){ }
    }

    show(targetId, menuItems, options = {}) {
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
    
        // 若已有菜单，先关闭旧菜单，但继续显示新菜单（不 return），以支持快速切换
        if (this.activeMenu) {
            this.hide();
            // 不 return，继续创建新的菜单
        }
    
        const defaultOptions = {
            offsetX: 0,
            offsetY: 4,
            width: 192,
            onSelect: null,
            onHide: null
        };
        options = { ...defaultOptions, ...options };
        this.onHideCallback = (typeof options.onHide === 'function') ? options.onHide : null;
    
        const menuContainer = document.createElement('div');
        menuContainer.id = 'dropdown-menu-container';
        menuContainer.className = 'fixed z-[1000] mt-2 p-2 rounded-[8px] bg-[#1a1d26] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.45),inset_0_0_0_1px_rgba(255,255,255,0.03)]';
        menuContainer.style.width = `${options.width}px`;
        menuContainer.style.zIndex = '1000';
    
        // 创建菜单项
        menuItems.forEach((item, index) => {
            const menuItem = document.createElement('a');
            menuItem.href = '#';
            menuItem.className = 'block w-full text-left my-1 px-4 py-3 rounded-[6px] text-[14px] leading-[12px] text-[#e5e7eb] hover:bg-white/10 hover:text-red-500 active:text-red-500 active:bg-white/10 transition-colors';
            menuItem.textContent = item;
    
            menuItem.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`[DropdownMenuUtil] 点击菜单项: ${item}, 索引: ${index}`);
                console.log(`[DropdownMenuUtil] options.onSelect: ${options.onSelect}`);
                if (options.onSelect) { 
                    options.onSelect(item, index); 
                }
                this.hide();
            });
    
            menuContainer.appendChild(menuItem);
        });
    
        // 在点击时获取最新位置
        const targetRect = targetElement.getBoundingClientRect();
        const menuTop = targetRect.bottom + options.offsetY;
        const menuLeft = targetRect.left + options.offsetX;
        menuContainer.style.top = `${menuTop}px`;
        menuContainer.style.left = `${menuLeft}px`;
    
        // 添加到文档并显示
        document.body.appendChild(menuContainer);
        this.activeMenu = menuContainer;

        // 悬停保持显示：在按钮、菜单以及二者之间的“桥接层”上均绑定 enter/leave
        const onEnter = () => {
            try{ if (this._hoverHideTimer){ clearTimeout(this._hoverHideTimer); this._hoverHideTimer = null; } }catch(_){ }
        };
        const onLeave = () => {
            try{
                if (this._hoverHideTimer){ clearTimeout(this._hoverHideTimer); }
                this._hoverHideTimer = setTimeout(() => { this.hide(); }, 150);
            }catch(_){ }
        };

        // 桥接层：覆盖按钮底部到菜单顶部的间隙，避免光标穿过 offsetY 导致抖动
        let bridge = null;
        try{
            const gapHeight = Math.max(0, options.offsetY);
            if (gapHeight > 0){
                bridge = document.createElement('div');
                bridge.id = 'dropdown-hover-bridge';
                bridge.className = 'fixed z-[1000]';
                bridge.style.top = `${targetRect.bottom}px`;
                bridge.style.left = `${menuLeft}px`;
                bridge.style.width = `${options.width}px`;
                // 稍微放大桥接高度，容错鼠标快速移动
                bridge.style.height = `${gapHeight + 6}px`;
                bridge.style.background = 'transparent';
                bridge.style.pointerEvents = 'auto';
                document.body.appendChild(bridge);
            }
        }catch(_){ bridge = null; }

        try{
            targetElement.addEventListener('mouseenter', onEnter);
            targetElement.addEventListener('mouseleave', onLeave);
            menuContainer.addEventListener('mouseenter', onEnter);
            menuContainer.addEventListener('mouseleave', onLeave);
            if (bridge){
                bridge.addEventListener('mouseenter', onEnter);
                bridge.addEventListener('mouseleave', onLeave);
            }
            this._hoverHandlers = { target: targetElement, onEnter, onLeave };
            this._hoverBridge = bridge;
        }catch(_){ this._hoverHandlers = null; this._hoverBridge = null; }
    
        // 动画
        requestAnimationFrame(() => {
            menuContainer.style.opacity = '1';
            menuContainer.style.transform = 'translateY(0)';
        });
    
        this.addOutsideClickHandler();
    }

    hide() {
        if (this.activeMenu) {
            this.activeMenu.remove();
            this.activeMenu = null;
            if (this.outsideClickHandler) {
                document.removeEventListener('click', this.outsideClickHandler);
                this.outsideClickHandler = null;
            }
            // 清理悬停事件与桥接层
            try{
                if (this._hoverHandlers && this._hoverHandlers.target){
                    const t = this._hoverHandlers.target;
                    t.removeEventListener('mouseenter', this._hoverHandlers.onEnter);
                    t.removeEventListener('mouseleave', this._hoverHandlers.onLeave);
                }
                if (this._hoverBridge){
                    this._hoverBridge.removeEventListener('mouseenter', this._hoverHandlers?.onEnter || (()=>{}));
                    this._hoverBridge.removeEventListener('mouseleave', this._hoverHandlers?.onLeave || (()=>{}));
                    try{ this._hoverBridge.remove(); }catch(_){ }
                    this._hoverBridge = null;
                }
                if (this._hoverHideTimer){ clearTimeout(this._hoverHideTimer); this._hoverHideTimer = null; }
                this._hoverHandlers = null;
            }catch(_){ }
            // onHide 回调
            try { if (typeof this.onHideCallback === 'function') this.onHideCallback(); } catch(_) {}
            this.onHideCallback = null;

        }
    }

    addOutsideClickHandler() {
        if (this.outsideClickHandler) {
            document.removeEventListener('click', this.outsideClickHandler);
        }

        this.outsideClickHandler = (e) => {
            if (this.activeMenu && !this.activeMenu.contains(e.target)) {
                this.hide();
            }
        };

        setTimeout(() => {
            document.addEventListener('click', this.outsideClickHandler);
        }, 0);
    }

    // 用户点击后主动关闭
    static hide(){ try { DropdownMenuUtil.getInstance().hide(); } catch(_) {} }
    
}

