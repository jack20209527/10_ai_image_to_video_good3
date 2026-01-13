        
is_mock = false; // 是否使用本地测试
t_type = "1";

// if (is_mock) {
//     console.log('text');
//     t_type = "0";//测试
// } 

function initAllPayPalButton (request_param_create_order, button_container) {

    paypal.Buttons({
        // 其它配置
        onClick: function(data, actions) {
            console.log('[PayPal] onClick 触发，当前登录状态:', typeof isUserLoggedIn !== 'undefined' ? isUserLoggedIn() : isLoggedIn);
            if (typeof isUserLoggedIn !== 'undefined' ? isUserLoggedIn() : isLoggedIn) {
                console.log('[PayPal] 用户已登录，允许支付');
                return actions.resolve();
            } else {
                console.log('[PayPal] 用户未登录，跳转登录页');
                login(); // 跳转登录
                return actions.reject();
            }
        },

        createOrder: function(data, actions) {
            console.log('[PayPal] createOrder 触发，准备创建订单');
            if (!(typeof isUserLoggedIn !== 'undefined' ? isUserLoggedIn() : isLoggedIn)) {
                console.log('[PayPal] 用户未登录，createOrder 拒绝');
                login();
                return actions.reject();
            }
            console.log('[PayPal] createOrder 参数:', request_param_create_order);
            return fetch(GlobalConfig.url + GlobalConfig.API_PAY_CREATE_ORDER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request_param_create_order)
            })
            .then(function(response) {
                console.log('[PayPal] createOrder 接口响应:', response);
                return response.json();
            })
            .then(function(orderData) {
                console.log('[PayPal] createOrder 返回数据:', orderData);
                console.log('[PayPal] createOrder 返回的订单号(orderId):', orderData.orderId);
                return orderData.orderId;
            })
            .catch(function(error) {
                console.error('[PayPal] createOrder 异常:', error);
            });
        },
        onApprove: function(data, actions) {
            console.log('[PayPal] onApprove 触发，收到的data:', data);
            console.log('[PayPal] onApprove 捕获订单号: ', data.orderID);
            // 显示加载弹窗
            if (typeof LoadingUtil !== 'undefined' && LoadingUtil.show) {
                LoadingUtil.show();
            }
            console.log('[PayPal] onApprove 开始调用后端捕获订单接口，参数:', {
                orderId: data.orderID,
                uid: request_param_create_order.uid,
                email: request_param_create_order.email,
                product_id: request_param_create_order.product_id,
                project_id: GlobalConfig.project_id,
                vip_type: request_param_create_order.vip_type,
                t: "0"
            });
            return fetch( GlobalConfig.url + GlobalConfig.API_PAY_CAPTURE_ORDER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        "orderId": data.orderID,
                        "uid": request_param_create_order.uid, // 从闭包中获取
                        "email": request_param_create_order.email,
                        "product_id": request_param_create_order.product_id,
                        "project_id": GlobalConfig.project_id,
                        "vip_type": request_param_create_order.vip_type,
                        "t": "0"
                    })

            })
            .then(function(response) {
                console.log('[PayPal] 捕获订单 - 响应状态码:', response.status);
                if (!response.ok) {
                    console.log (`[PayPal] HTTP错误，状态码: ${response.status}`);
                }
                return response.json();
            })
            .then(function(captureData) {
                console.log('[PayPal] 捕获订单返回数据:', captureData);
                // 启动轮询
                console.log('[PayPal] 启动订单状态轮询，订单号:', data.orderID);
                startPolling(data.orderID);
            })
            .catch(function(error) {
                console.error('[PayPal] 捕获订单 - 错误:', error);
                // 支付失败也要关闭加载弹窗
                if (typeof LoadingUtil !== 'undefined' && LoadingUtil.hide) {
                    LoadingUtil.hide();
                }
            });
        },
        onCancel: function(data, actions) {
            console.log('[PayPal] 用户取消支付:', data);
            // 取消支付也要关闭加载弹窗
            if (typeof LoadingUtil !== 'undefined' && LoadingUtil.hide) {
                LoadingUtil.hide();
            }
            alert('Payment cancelled.');
        },
        onError: function(err) {
            console.error('[PayPal] 支付出错:', err);
            // 支付出错也要关闭加载弹窗
            if (typeof LoadingUtil !== 'undefined' && LoadingUtil.hide) {
                LoadingUtil.hide();
            }
            alert('An error occurred during payment.');
        }
    }).render(button_container);
}

// 动态获取本地用户信息并构建PayPal参数
function getCurrentUserPayParam(defaultParam) {

    localUser = LocalStorageUtil.getUserObject();
    console.log("开始刷新支付组件了.")
    console.log('localUser: ', localUser);
    console.log(localUser == null);

    if (localUser) {
        console.log('my_pay-昵称:', localUser.name);
        console.log('my_pay-头像:', localUser.head_url);
        console.log('my_pay-uid:', localUser.uid);
        console.log('my_pay-project_id:', GlobalConfig.project_id);
        console.log('my_pay-积分:', localUser.jifen);
        console.log('my_pay-token:', localUser.token);
        console.log('my_pay-token_expire:', localUser.token_expire);
        console.log('my_pay-t_type:',  t_type);
    } 

    if (localUser && localUser.uid) {
        return {
            ...defaultParam,
            uid: localUser.uid,
            email: localUser.email || defaultParam.email,
            project_id: GlobalConfig.project_id,
            product_id: defaultParam.product_id, // 默认产品ID
            vip_type: localUser.vip_type || defaultParam.vip_type,
            t: t_type
        };
    }
    return defaultParam;
}

localUser = LocalStorageUtil.getUserObject();
console.log("开始刷新支付组件了.")
console.log('localUser: ', localUser);
console.log(localUser == null);

if (localUser) {
    console.log('my_pay-昵称:', localUser.name);
    console.log('my_pay-头像:', localUser.head_url);
    console.log('my_pay-uid:', localUser.uid);
    console.log('my_pay-project_id:', GlobalConfig.project_id);
    console.log('my_pay-积分:', localUser.jifen);
    console.log('my_pay-token:', localUser.token);
    console.log('my_pay-token_expire:', localUser.token_expire);
    console.log('my_pay-t_type:',  t_type);
} 

// 初始化PayPal按钮时动态获取用户信息
// let defaultParam1 = { "uid":"12",  "email":"jack20219527@gmail.com", "project_id":GlobalConfig.project_id, "product_id":"9",  "vip_type":"vip_ji_fen", "t":t_type };
// let defaultParam2 = { "uid":"12",  "email":"jack20219527@gmail.com", "project_id":GlobalConfig.project_id, "product_id":"10",  "vip_type":"vip_ji_fen", "t":t_type };
// let defaultParam3 = { "uid":"12",  "email":"jack20219527@gmail.com", "project_id":GlobalConfig.project_id, "product_id":"11",  "vip_type":"vip_ji_fen", "t":t_type };
let defaultParam1 = { "uid":localUser.uid,  "email":localUser.email, "project_id":GlobalConfig.project_id, "product_id":"9",  "vip_type":"vip_ji_fen", "t":t_type };
let defaultParam2 = { "uid":localUser.uid,  "email":localUser.email, "project_id":GlobalConfig.project_id, "product_id":"10",  "vip_type":"vip_ji_fen", "t":t_type };
let defaultParam3 = { "uid":localUser.uid,  "email":localUser.email, "project_id":GlobalConfig.project_id, "product_id":"11",  "vip_type":"vip_ji_fen", "t":t_type };

console.log('defaultParam1 默认的: ', defaultParam1);
console.log('defaultParam2 默认的: ', defaultParam2);
console.log('defaultParam3 默认的: ', defaultParam3);

initAllPayPalButton(getCurrentUserPayParam(defaultParam1), '#paypal-button-container1');
initAllPayPalButton(getCurrentUserPayParam(defaultParam2), '#paypal-button-container2');
initAllPayPalButton(getCurrentUserPayParam(defaultParam3), '#paypal-button-container3');

let pollCount = 0;
let polling = false; // 轮询开关
const maxPolls = 30;
const pollInterval = 5000;

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
    get_user_info_by_order_id(order_id).then(status => {
        console.log(`[轮询] get_user_info_by_order_id返回: status=${status}, polling=${polling}`);
        if (!polling) {
            console.log('[轮询] polling为false（回调中），终止轮询');
            return;
        }
        if (status === "COMPLETED") {
            console.log('[轮询] 订单已完成，停止轮询');
            polling = false;
            if (typeof LoadingUtil !== 'undefined' && LoadingUtil.hide) {
                LoadingUtil.hide();
            }
            return;
        } else if (status === "ERROR") {
            console.log('[轮询] 订单状态获取出错，终止轮询');
            polling = false;
            if (typeof LoadingUtil !== 'undefined' && LoadingUtil.hide) {
                LoadingUtil.hide();
            }
            return;
        } else {
            pollCount++;
            console.log(`[轮询] 继续轮询, pollCount=${pollCount}, polling=${polling}`);
            setTimeout(() => pollOrderStatus(order_id), pollInterval);
        }
    }).catch(function(err) {
        console.log('[轮询] 轮询出错，终止轮询', err);
        polling = false;
        if (typeof LoadingUtil !== 'undefined' && LoadingUtil.hide) {
            LoadingUtil.hide();
        }
    });
}

// 支付前调用
function startPolling(order_id) {
    pollCount = 0;
    polling = true;
    console.log(`[轮询] startPolling called. pollCount=${pollCount}, polling=${polling}, order_id=${order_id}`);
    pollOrderStatus(order_id);
}

function get_user_info_by_order_id(order_id) {

    localUser = LocalStorageUtil.getUserObject();
    console.log("开始刷新支付组件了.")
    console.log('localUser: ', localUser);
    console.log(localUser == null);

    const jsonData = {
        "opt": "9", // 必须是9
        // "google_token": response.credential,
        "uid": localUser.uid, // 从本地获取
        "order_id": order_id, // "1HL18739369889701",
        "project_id": GlobalConfig.project_id,
        "device_info": "6789",
        "my_token": "MTA0MjM3MDcwNDIyMDU4ODI3NTAwLTE3Mjk4MjcyNDA3NjEtYmY0Y2JkNWYtY2YxZC00MTIyLThmZjMtZGU3OGIyY2NlMjQwLTA3ZTlkNzcyZGMzNjUyMjc\u003d"
    };

    console.log("订单号: ", order_id);

    const jsonString = JSON.stringify(jsonData);
    console.log(jsonString);

    let real_url = GlobalConfig.url + GlobalConfig.API_PAY_GET_USER_INFO_BY_ORDER_COMPLETED + jsonString
    console.log(real_url);

    return fetch(real_url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Custom-Header': 'CustomValue' // 其他自定义头部
                }
            })
        .then(response => {
          // 检查响应的状态码
          if (!response.ok) {
            console.log('Network response was not ok ' + response.statusText);
          }
          // 将响应解析为 JSON
          return response.json();
        })
        .then(data => {
          // 处理解析后的数据
          console.log('GET 请求成功:', data);
          try {
              // const parsedData = JSON.parse(data);
              const parsedData = data;
              const userData = parsedData.data;
  
              LocalStorageUtil.saveUserObject(userData); // 是json对象
              console.log("正在保存");
  
                // 获取 JSON 对象
                localUser = LocalStorageUtil.getUserObject();
                if (localUser) {
                    console.log('本地数据:', localUser.uid);
                    console.log('本地数据:', localUser.project_id);
                    console.log('本地数据:', localUser.jifen);
                    console.log('本地数据:', localUser.token);
                    console.log('本地数据:', localUser.token_expire);
                    console.log('本地数据-订单状态:', localUser.ext0);
                }
                
              console.log(userData.id);
              console.log(userData.uid);
              console.log(userData.head_url);
              console.log(userData.email);
              console.log(userData.name);
              console.log(userData.google_id);
              console.log(userData.project_id);
              console.log("订单状态: ", userData.ext0);
              console.log(parsedData.code);
              console.log(parsedData.msg);
  
              // COMPLETED PENDING DENIED FAILED PARTIALLY_REFUNDED REFUNDED
              if (userData.ext0 == "COMPLETED") {
                console.log("订单已完成");
  
                LocalStorageUtil.saveUserObject(userData);
      
                refreshUser ();
                updateUI ();
                refreshJifen();
            
                // 隐藏加载状态
                LoadingUtil.hide();
  
                polling = false
                console.log("get_user_info_by_order_id: 设置了不在轮训了");
                
                return "COMPLETED";
              } else if (userData.ext0 == "PENDING") {
                console.log("订单待处理");
                return "PENDING";
              } else if (userData.ext0 == "DENIED") {
                console.log("订单已取消");
                return "DENIED";
              } else if (userData.ext0 == "FAILED") {
                console.log("订单失败");
                // 隐藏加载状态
                LoadingUtil.hide();
                alert("oder failed");
                return "FAILED";
              } else if (userData.ext0 == "PARTIALLY_REFUNDED") {
                console.log("订单失败");
                return "PARTIALLY_REFUNDED";
              } else if (userData.ext0 == "REFUNDED") {
                console.log("订单退款");
                return "REFUNDED";
              } else {
                console.log("订单未完成，继续刷新");
                return "UNKNOWN";
              }
  
            } catch (error) {
            console.error('Error parsing JSON:', error);
            return "ERROR";
          }
        })
        .catch(error => {
          // 处理请求错误
          console.error('GET 请求失败:', error);
          return "ERROR";
        })
        .finally(() => {
          
        });
}