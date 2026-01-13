
class ClickUtil {
  /**
   * 添加点击事件
   * @param {string} elementId - 元素ID
   * @param {Function} callback - 点击回调函数
   */
  static onClick(elementId, callback) {
      const element = document.getElementById(elementId);
      if (element) {
          element.addEventListener('click', callback);
      } else {
          console.error(`[ClickUtil] 未找到ID为"${elementId}"的元素`);
      }
  }
}

/**
 * 全局配置类
 * 用于存储项目中使用的全局静态变量
 */
class GlobalConfig {

    static url = 'https://linkprohub.top';
    // static url = 'http://localhost:39603';

    // 项目相关配置
    static project_id = "3";
    static product_id = "9";

    // creem 产品相关配置
    static product_id_basic = "9"; // 基础版
    static product_id_popular = "10"; // 流行版
    static product_id_advanced = "11"; // 高级版
    static creem_product_id_basic = "prod_py0jvVhSqZOFVPlisRQEs"; // 基础版 测试数据
    static creem_product_id_popular = "prod_2wtCngeJ6Qh8UxMBkDWfOW"; // 流行版 测试数据
    static creem_product_id_advanced = "prod_4dTl2lOSeNZ7miMaOFprsl"; // 高级版 测试数据
    

    // 会员方式, 必须要传的
    static VIP_TYPE_JI_FEN = "vip_ji_fen" // 按照积分设置的会员

    static default_model = "veo3-fast";

    // 接口: 图片生成类型
    static API_NANO = "/go/nano2" // "/go/generate_nano_image" // 支持: 文生图、图生图
    static API_FLUX = "/go/generate_flux_image" // 支持: 文生图、图生图

    // 接口: 视频类型
    static API_V_VIDEO = "/go/v_video" // vidu-支持: 文生、图生、模版生
    static API_GET_V_TASK_DETAIL = "/go/v/get_task_detail"
    static API_VEO3 = "/go/v/cr" // 只支持: 文生视频
    static API_PAY_CREATE_ORDER = "/go/p/cr" // 创建订单
    static API_PAY_CAPTURE_ORDER = "/go/p/ca" // 支付快照，验证订单是否支付成功
    static API_PAY_GET_USER_INFO_BY_ORDER_COMPLETED = "/go/lo/" // 用户的订单是否支付成功 opt必须是9
    
    // 类型: 图片生成类型
    static TYPE_IMAGE_NANO = "0";   // 图片生成类型 nona
    static TYPE_IMAGE_FLUX = "1";   // 图片生成类型 flux

    // 类型: V 视频类型:  支持 文生、图生、模版生
    static TYPE_VIDEO_V_IMAGE_TO_VIDEO = "0";
    static TYPE_VIDEO_V_TEXT_TO_VIDEO = "1";
    static TYPE_VIDEO_V_TEMPLATE_TO_VIDEO = "2";

    static TYPE_PAGE_IMAGE_TO_VIDEO = "0";
    static TYPE_PAGE_TEXT_TO_VIDEO = "1";
    static TYPE_PAGE_TEMPLATE_TO_VIDEO = "2";
    static TYPE_PAGE_IMAGE_TO_IMAGE = "3";
    static TYPE_PAGE_TEXT_TO_IMAGE = "4";


}

