// 语言配置文件
const LanguageConfig = {
    // 支持的语言列表
    supportedLanguages: ['en', 'zh', 'es'],
    
    // 默认语言
    defaultLanguage: 'en',
    
    // 翻译内容，如果内容相同，这个navid就用同一个
    translations: {
        en: {
            nav: {
                my_work: "My Works",
                price: "Price",
                language: "English",
                btn_login: "Login",
                language_dlg_title: "Select Language",
            },
            hero: {
                sub_title: "Revamp your photos.",
                desc: "Use advanced AI technology to optimize your photos with one click. Supports super-resolution, noise reduction, color enhancement and other functions.",
                btn_try: "Try It Now",
                btn_intelligent_optimization: "AI Intelligent",
                btn_esolution_improvement: "4x Resolution Improvement",

                enhancement_title: "Powerful enhancements",
                enhancement_desc: "Give your photos a professional-grade enhancement using state-of-the-art AI technology",
                enhancement_resolution: "Powerful enhancements",
                enhancement_resolution_desc: "Use advanced AI algorithms to upgrade low-resolution images to ultra-high-definition quality so that every detail is clearly visible",
                enhancement_noise: "Intelligent noise reduction",
                enhancement_noise_desc: "Automatically identify and remove image noise, retaining details while providing clearer visual effects",

                enhancement_color: "Color optimization",
                enhancement_color_desc: "Intelligently adjust color balance and saturation to make photos more natural and colorful",
                enhancement_repair: "Smart repair",
                enhancement_repair_desc: "Automatically identify and repair defects in pictures to make them more flawless",
            
                effect_title: "Stunning Effect Comparison",
                effect_title_desc: "Witness the magical changes brought about by AI",

                effect_before_image: "Before",
                effect_after_image: "After",

                effect_4_resolution: "4x super resolution",
                effect_4_noise: "Intelligent noise reduction",
                effect_4_color: "Color enhancement",

                flow_title: "Three simple steps to enable enhancement",
                flow_desc: "No professional knowledge required, everyone can get started easily",
                flow_1_title: "Upload pictures",
                flow_1_desc: "Drag or select the image you want to enhance, multiple formats supported",
                flow_2_title: "Select function",
                flow_2_desc: "Select enhanced functions and customize parameter settings according to needs",
                flow_3_title: "One-click enhancement",
                flow_3_desc: "AI automatically processes and quickly exports high-quality results",

                price_title: "Choose the plan that suits you",
                price_desc: "Flexible price plans to meet different needs",
                price_basic_title: "Basic",
                price_popular: "Popular",
                price_advanced: "Advanced",
                price_buy_now: "Buy Now",

                feedback_title: "User Feedback",
                feedback_desc: "See what other users say about us",


                faq_title: "FAQ",
                faq_desc: "Learn more about EnhancePix",
                faq_sub_name_1: "Sarah Chen",
                faq_sub_role_1: "专业摄影师",
                faq_sub_content_1: "EnhancePix 的AI超分辨率功能令人惊叹！它完美地保留了照片的细节，同时大幅提升了画质。对于需要放大展示的作品来说简直是神器。",
                faq_sub_name_2: "李明",
                faq_sub_role_2: "家庭相册收藏家",
                faq_sub_content_2: "老照片修复功能太神奇了！成功修复了许多泛黄破损的珍贵家庭照片，让回忆重现光彩。这对我们家族来说意义重大。",

                technology_color_title: "Smart color enhancement",
                technology_color_desc: "Learn more about EnhancePix",
                technology_color_sub_title: "Smart color optimization",
                technology_color_sub_desc: "AI intelligent color adjustment accurately restores true colors",

                technology_beaut_title: "AI portrait beautification",
                technology_beaut_desc: "Intelligent recognition of portrait features, natural beautification, so that every portrait photo is perfectly presented.",
                technology_beaut_sub_title: "Smart portrait beautification",
                technology_beaut_sub_desc: "Natural beauty, light and shadow refinement",
            },

        },
        zh: {
            nav: {
                my_work: "我的作品",
                price: "价格",
                language: "中文",
                btn_login: "登录",

                my_work: "我的作品",
                about: "关于",
                contact: "联系",
                lan: "语言",
            },
            hero: {
                title: "高清图片转换器",
                subtitle: "将您的图片转换成高清质量",
                uploadButton: "上传图片",
                processing: "处理中...",
                success: "转换完成！"
            },
            features: {
                title: "特点",
                quality: "高清质量",
                speed: "快速处理",
                free: "免费使用"
            }
        },
        es: {
            nav: {
                home: "Inicio",
                about: "Sobre",
                contact: "Contacto"
            },
            hero: {
                title: "Convertidor de Fotos HD",
                subtitle: "Transforma tus fotos en calidad HD",
                uploadButton: "Subir Foto",
                processing: "Procesando...",
                success: "¡Conversión Completa!"
            },
            features: {
                title: "Características",
                quality: "Calidad HD",
                speed: "Procesamiento Rápido",
                free: "Uso Gratuito"
            }
        }
    }
};