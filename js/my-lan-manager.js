// 语言管理器
class LanguageManager {
    // 获取当前语言
    static getCurrentLanguage() {
        return localStorage.getItem('userLanguage') || LanguageConfig.defaultLanguage;
    }

    // 初始化语言
    static init() {
        const currentLang = this.getCurrentLanguage();
        this.updateContent(currentLang);
        // 更新HTML lang属性
        document.documentElement.lang = currentLang;
    }

    // 切换语言
    static switchLanguage(lang) {
        if (LanguageConfig.supportedLanguages.includes(lang)) {
            localStorage.setItem('userLanguage', lang);
            this.updateContent(lang);
            document.documentElement.lang = lang;
            return true;
        }
        console.error(`Language ${lang} is not supported`);
        return false;
    }

    // 更新页面内容
    static updateContent(lang) {
        document.querySelectorAll('[data-lan]').forEach(element => {
            const keys = element.getAttribute('data-lan').split('.');
            let value = LanguageConfig.translations[lang];
            
            // 获取嵌套的翻译值
            try {
                for (const key of keys) {
                    value = value[key];
                }
                
                // 根据元素类型设置内容
                if (element.tagName === 'INPUT') {
                    if (element.type === 'placeholder') {
                        element.placeholder = value;
                    } else {
                        element.value = value;
                    }
                } else if (element.tagName === 'IMG') {
                    element.alt = value;
                } else {
                    element.textContent = value;
                }
            } catch (error) {
                console.error(`Translation not found for key: ${keys.join('.')} in language: ${lang}`);
            }
        });
    }

    // 获取特定翻译文本
    // static getTranslation(key, lang = null) {
    //     const currentLang = lang || this.getCurrentLanguage();
    //     const keys = key.split('.');
    //     let value = LanguageConfig.translations[currentLang];
        
    //     try {
    //         for (const k of keys) {
    //             value = value[k];
    //         }
    //         return value;
    //     } catch (error) {
    //         console.error(`Translation not found for key: ${key} in language: ${currentLang}`);
    //         return key;
    //     }
    // }
}