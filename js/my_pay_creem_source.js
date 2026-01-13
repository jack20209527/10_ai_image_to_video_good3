        
 /**
  整体步骤
  1. 点击购买按钮 - 创建订单: 调用 get_creem_checkout_url 函数，创建订单
  2. 开始轮询返回的订单号: 调用 startPolling 函数，
  3. 轮询过程中-获取订单状态: 调用 get_creem_order_status 函数，获取订单状态

  4. 根据订单状态，进行不同的处理
    （1）如果订单状态为 paid，则表示订单支付成功，调用 add_jifen 函数，增加积分
    （2）如果订单状态为 pending，则表示订单待支付，继续轮询
    （3）如果订单状态为 refunded，则表示订单支付失败或者退款，停止轮询
    （4）如果订单状态为 unknown，则表示订单状态未知，停止轮询
  */
document.addEventListener('DOMContentLoaded', () => {

    localUser = LocalStorageUtil.getUserObject();
    if (localUser) {
        console.log('本地数据-昵称:', localUser.name);
        console.log('本地数据-头像:', localUser.head_url);
        console.log('本地数据-uid:', localUser.uid);
        console.log('本地数据-project_id:', localUser.project_id);
        console.log('本地数据-积分:', localUser.jifen);
        console.log('本地数据-token:', localUser.token);
        console.log('本地数据-token_expire:', localUser.token_expire);
    } else {
        console.log('本地数据为空');
    }

    ClickUtil.onClick('id_btn_pay_basic', () => {
        get_creem_checkout_url (GlobalConfig.product_id_basic, GlobalConfig.creem_product_id_basic);
    });

    ClickUtil.onClick('id_btn_pay_popular', () => {
        get_creem_checkout_url (GlobalConfig.product_id_popular, GlobalConfig.creem_product_id_popular);
    });
    
    ClickUtil.onClick('id_btn_pay_advanced', () => {
        get_creem_checkout_url (GlobalConfig.product_id_advanced, GlobalConfig.creem_product_id_advanced);
    });

});

// 1. 点击购买按钮 - 创建订单:
function get_creem_checkout_url (product_id, creem_product_id) {

    localUser = LocalStorageUtil.getUserObject();

    console.log("localUser: ", localUser == null);
    if (localUser != null) {
        console.log('本地数据:', localUser.uid);
        console.log('本地数据:', localUser.project_id);
        console.log('本地数据:', localUser.jifen);
        console.log('本地数据:', localUser.token);
        console.log('本地数据:', localUser.token_expire);
        console.log('本地数据-订单状态:', localUser.ext0);

        let jsonData = {
            "opt": "0", // 测试
            "uid": localUser.uid, // "321",
            "project_id": GlobalConfig.project_id,
            "product_id": product_id, // GlobalConfig.product_id_basic,
            "creem_product_id": creem_product_id,     //"prod_py0jvVhSqZOFVPlisRQEs",
            "device_info": "6789",
            "vip_type": GlobalConfig.VIP_TYPE_JI_FEN,
            "t": "0",
        };
    
        const request_param_create_order = JSON.stringify(jsonData);
        console.log("请求的参数: ", request_param_create_order);
    
        let real_url = GlobalConfig.url + "/go/creem_create";
        console.log("请求的url: ", real_url);
    
        // 开始网络请求，创建订单
        fetch(real_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: request_param_create_order
        })
        .then(function(response) {
            console.log('[Creem] get_creem_checkout_url 接口响应:', response);
            return response.json();
        })
        // {"id":"ch_7M0IdoOt0qZE0f3coCNGQn","object":"checkout","product":"prod_py0jvVhSqZOFVPlisRQEs","units":1,"status":"pending","checkout_url":"https://creem.io/test/checkout/prod_py0jvVhSqZOFVPlisRQEs/ch_7M0IdoOt0qZE0f3coCNGQn","metadata":[{"id":"10001","email":"jack20219527@gmail.com","product_id":"prod_py0jvVhSqZOFVPlisRQEs"}],"mode":"test"}
        .then(function(orderData) {
            console.log('[Creem] get_creem_checkout_url 返回数据:', orderData);
            console.log('[Creem] get_creem_checkout_url 返回的checkout_url:', orderData.checkout_url);
    
            // 你的 JSON 字符串
            const jsonString = orderData.data; // '{"id":"ch_7M0IdoOt0qZE0f3coCNGQn","object":"checkout","product":"prod_py0jvVhSqZOFVPlisRQEs","units":1,"status":"pending","checkout_url":"https://creem.io/test/checkout/prod_py0jvVhSqZOFVPlisRQEs/ch_7M0IdoOt0qZE0f3coCNGQn","metadata":[{"id":"10001","email":"jack20219527@gmail.com","product_id":"prod_py0jvVhSqZOFVPlisRQEs"}],"mode":"test"}';
            // 1. 将 JSON 字符串解析为 JavaScript 对象
            const responseObject = JSON.parse(jsonString);
            // 2. 提取 checkout_url
            const checkoutUrl = responseObject.checkout_url;
            // 打印结果，验证是否成功
            console.log(checkoutUrl); 
    
    
            // 3. 检查 metadata 字段是否存在，且它是否为一个数组，并且长度大于0
            let orderId = null;
            if (responseObject.metadata && Array.isArray(responseObject.metadata) && responseObject.metadata.length > 0) {
                // 4. 访问数组的第一个元素，并提取 order_id
                const metadataObject = responseObject.metadata[0];
                // 确保 metadataObject 存在且包含 order_id 字段
                if (metadataObject && typeof metadataObject.order_id === 'string') {
                    orderId = metadataObject.order_id;
                }
            }
    
            if (orderId) {

                window.open(checkoutUrl, '_blank');

                console.log("成功解析出来的订单号:", orderId);
                // '5e964f89-01c0-43a6-8c47-ae91671f3ad8_321'
                // 启动轮训
                startPolling(orderId);
    
            } else {
                console.error("未找到订单号或数据格式不正确。");
            }
            
        })
        .catch(function(error) {
            console.error('[Creem] get_creem_checkout_url 异常:', error);
        });
    }  else {
        console.log("local user 数据为空");
    }

}



let pollCount = 0;
let polling = false; // 轮询开关
const maxPolls = 30;
const pollInterval = 5000;

// 支付前调用
// e1ed4a7f-e4c1-45dc-b0fe-38655d020939_321   paid
// 5e964f89-01c0-43a6-8c47-ae91671f3ad8_321   pending

// 2. 开始轮询返回的订单号:
// 循环总入口
function startPolling(order_id) {
// function startPolling() {
    // order_id = "e1ed4a7f-e4c1-45dc-b0fe-38655d020939_321";
    // order_id = "5e964f89-01c0-43a6-8c47-ae91671f3ad8_321";

    pollCount = 0;
    polling = true;
    console.log(`[轮询] startPolling called. pollCount=${pollCount}, polling=${polling}, order_id=${order_id}`);
    pollOrderStatus (order_id);
}

// 开始循环
function pollOrderStatus(order_id) {
    console.log(`[轮询] pollOrderStatus called. pollCount=${pollCount}, polling=${polling}, order_id=${order_id}`);
    if (!polling) {
        console.log('[轮询] polling为false，终止轮询');
        return;
    }
    if (pollCount >= maxPolls) {
        console.log('[轮询] 轮询超时，订单可能处理失败');
        polling = false;
        if (typeof LoadingUtil !== 'undefined' && LoadingUtil.hide) {
            LoadingUtil.hide();
        }
        return;
    }

    get_creem_order_status (order_id);

}


// 3. 获取订单状态的请求
function get_creem_order_status (order_id) {

    localUser = LocalStorageUtil.getUserObject();
    console.log("localUser: ", localUser == null);

    if (localUser && localUser.uid) {
        console.log('本地数据:', localUser.uid);
        console.log('本地数据:', localUser.project_id);
        console.log('本地数据:', localUser.jifen);
        console.log('本地数据:', localUser.token);
        console.log('本地数据:', localUser.token_expire);
        console.log('本地数据-订单状态:', localUser.ext0);


        let jsonData = {
            "opt": "0", // 测试
            // "uid": localUser ? localUser.uid : "0",
            "uid": localUser.uid, // "321",
            "project_id": GlobalConfig.project_id,
            "order_id": order_id, // "e1ed4a7f-e4c1-45dc-b0fe-38655d020939_321",
            "device_info": "6789",
            "vip_type": GlobalConfig.VIP_TYPE_JI_FEN,
            "t": "0",
        };

        const request_param_create_order = JSON.stringify(jsonData);
        console.log("请求的参数: ", request_param_create_order);

        let real_url = GlobalConfig.url + "/go/creem_check_status";
        console.log("请求的url: ", real_url);

        fetch(real_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: request_param_create_order
        })
        .then(function(response) {
            console.log('[Creem] get_creem_checkout_url 接口响应:', response);
            return response.json();
        })
        // {"id":"ch_7M0IdoOt0qZE0f3coCNGQn","object":"checkout","product":"prod_py0jvVhSqZOFVPlisRQEs","units":1,"status":"pending","checkout_url":"https://creem.io/test/checkout/prod_py0jvVhSqZOFVPlisRQEs/ch_7M0IdoOt0qZE0f3coCNGQn","metadata":[{"id":"10001","email":"jack20219527@gmail.com","product_id":"prod_py0jvVhSqZOFVPlisRQEs"}],"mode":"test"}
        .then(function(orderData) {
            console.log('[Creem] get_creem_checkout_url 返回数据:', orderData);
            console.log('[Creem] get_creem_checkout_url 返回的checkout_url:', orderData.checkout_url);

            // 你的 JSON 字符串
            const jsonString = orderData.data; // '{"id":"ch_7M0IdoOt0qZE0f3coCNGQn","object":"checkout","product":"prod_py0jvVhSqZOFVPlisRQEs","units":1,"status":"pending","checkout_url":"https://creem.io/test/checkout/prod_py0jvVhSqZOFVPlisRQEs/ch_7M0IdoOt0qZE0f3coCNGQn","metadata":[{"id":"10001","email":"jack20219527@gmail.com","product_id":"prod_py0jvVhSqZOFVPlisRQEs"}],"mode":"test"}';
            // 1. 将 JSON 字符串解析为 JavaScript 对象
            const responseObject = JSON.parse(jsonString);
            console.log("返回的结构体: ", responseObject);
            // 2. 提取 订单状态
            const order_status = responseObject.order_status;
            // 打印结果，验证是否成功
            console.log("订单状态: ", order_status); 

            if (order_status == "paid") {
                console.log("订单已完成");
                // 订单支付成功，首先获取一下用户数据，获取成功后刷新积分，再跳转到首页

                polling = false;
                order_jifen = responseObject.jifen  // 订单积分
                console.log("订单积分: ", order_jifen);

                if (order_jifen) {
                    real_order_jifen = parseInt(responseObject.jifen, 10);
                    real_local_jifen = parseInt(localUser.jifen, 10);
                    console.log("订单积分: ", real_order_jifen);
                    console.log("用户原有的积分: ", real_local_jifen);
                    add_jifen = real_order_jifen + real_local_jifen;
                    console.log("用户原有的积分: ", add_jifen);
                    localUser.jifen = add_jifen;
                    LocalStorageUtil.saveUserObject(localUser);

                    console.log("订单积分: ", order_jifen);
                    console.log("用户积分: ", localUser.jifen);

                    // window.location.href = "https://phototovideoai.app/";
                    window.location.href = "http://localhost:5500/";
                }

            } else if (order_status == "pending") {
                console.log("订单待支付");
                pollCount++;
                console.log(`[轮询] 继续轮询, pollCount=${pollCount}, polling=${polling}`);
                setTimeout(() => pollOrderStatus(order_id), pollInterval);

            } else if (order_status == "refunded") {
                console.log("订单支付失败或者退款");
                polling = false;
            } else {
                console.log("订单状态未知");
            }

            // window.open(orderData.checkout_url, '_blank');
            
        })
        .catch(function(error) {
            console.error('[Creem] get_creem_checkout_url 异常:', error);
            polling = false;
        });

    } else {
        console.log("local user 数据为空");
    }

}



