
// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  const lang = document.documentElement.lang;
    faq_list = [
      {
        "title": "What is our AI Platform? What are its features?",
        "content": "Our platform is an <span class=\"text-purple-300\">all-in-one AI Video & Image Generator</span>, integrating powerful features like text-to-video, our leading <span class=\"text-purple-300\">photo to video ai</span> tool, and text-to-image. We are dedicated to providing users with the simplest way to create professional-grade, high-quality content using AI, no professional skills required."
      },
      {
        "title": "How do I convert a photo to an AI video?",
        "content": "Using our <span class=\"text-purple-300\">photo to video ai</span> tool is very simple. Just upload your photo, select your preferred AI model (such as the popular <span class=\"text-red-300\">Nano Banana model</span>), and click generate. Our AI will quickly turn your static photo into a dynamic <span class=\"text-purple-300\">ai video from photo</span>, making the entire process fast and efficient."
      },
      {
        "title": "Which AI models does the platform support?",
        "content": "We have carefully selected and integrated several industry-leading <span class=\"text-purple-300\">Popular AI Video Models</span>, including Google's <span class=\"text-red-300\">Veo3</span>, Kuaishou's <span class=\"text-red-300\">Kling</span>, and the innovative <span class=\"text-red-300\">Flux.1 kontext</span> model. Each model has unique characteristics to meet your diverse creative needs, from cinematic videos to unique-style images."
      },
      {
        "title": "Can I use a text prompt to generate an image?",
        "content": "Yes, of course. Our platform supports a powerful <span class=\"text-purple-300\">ai image generator</span> feature. Simply enter your creative description into the text box, and the AI will transform it into a unique visual work. This is the fastest way to turn your imagination into reality."
      },
      {
        "title": "Is the platform free to use? Do you offer a free version?",
        "content": "We offer a <span class=\"text-purple-300\">free photo to video ai</span> trial version so you can experience most of our core features for free. For free users, generated videos or images will contain a watermark. To get watermark-free, high-definition content and unlock more advanced features, you can subscribe to one of our paid plans."
      },
      {
        "title": "Can I use the AI-generated content for commercial purposes?",
        "content": "Yes, if you are a paid subscriber, you have commercial usage rights for any content generated through our platform. This means you can use these <span class=\"text-purple-300\">ai video generator</span> and <span class=\"text-purple-300\">ai image generator</span> creations, including those from our <span class=\"text-purple-300\">photo to video ai</span> tool, for commercial purposes such as advertising, marketing, and education."
      },
      {
        "title": "How long does it typically take to generate an AI video?",
        "content": "Our platform is designed for efficiency. The exact generation time depends on the complexity of your request, video duration, and the model selected. Typically, a simple <span class=\"text-purple-300\">AI video from photo</span> or text-to-video takes only a few minutes to complete, which is much faster than traditional video editing."
      },
      {
        "title": "Why might my video generation fail?",
        "content": "Generation failures usually occur if your prompt violates our content policy. This applies to both our text-to-video and <span class=\"text-purple-300\">photo to video ai</span> tools. Our AI models have content moderation in place to prevent the creation of inappropriate content. Please review your text or images to ensure they comply with our terms of service. Rest assured, failed generations do not consume any credits."
      },
      {
        "title": "Can I add audio to videos generated with the Veo3 model?",
        "content": "Yes, the <span class=\"text-red-300\">Veo3 Model</span> is a powerful feature on our platform. It not only generates high-quality videos but also allows you to explore <span class=\"text-red-300\">Veo3 Video Generation with Audio</span>, enabling you to combine sound and visuals for more expressive creations."
      },
      {
        "title": "If I have more questions, how can I contact the support team?",
        "content": "If you have any further questions or need help with our <span class=\"text-purple-300\">photo to video ai</span> tool or any other features, you can always visit our help center or contact our support team at support@phototovideoai.app. We are here to answer your questions and ensure you have the best creative experience."
      }
    ]

      // accordionData = translations[lang]
      const accordionContainer = document.getElementById('accordion-container');
    
      faq_list.forEach(item => {
        const accordionItem = document.createElement('div');
        accordionItem.innerHTML = `
            <div class="arrow_down_button_parent_home">
                <button class="arrow_down_button_home">
                    ${item.title}
                    <span class="arrow_down_arrow_home"></span>
                </button>
                <div class="arrow_down_panel_home">
                    <p class="arrow_down_panel_text_home">${item.content}</p>
                </div>
            </div>
        `;
        accordionContainer.appendChild(accordionItem);
      });
    

    var acc = document.getElementsByClassName("arrow_down_button_home");
        var i;
        for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            var arrow = this.querySelector(".arrow_down_arrow_home"); // 获取箭头元素
            arrow.classList.toggle("active"); // 切换箭头元素的 active 类
        
            if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            } 
        });
        }

}); 