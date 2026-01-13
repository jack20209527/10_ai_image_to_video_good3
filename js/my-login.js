


// 1. 判断是否登录
function isUserLoggedIn() {
  let localUser = LocalStorageUtil.getUserObject();
  console.log('localUser: ', localUser);
  console.log(localUser == null);
  return localUser != null;
}

// 2. 退出
function logout() {
  LocalStorageUtil.removeUserObject();
  document.getElementById('user-name').innerText = '未登录';

  // 移除头像背景图片
  const avatarDiv = document.getElementById('user_header');
  avatarDiv.style.removeProperty('background-image');
  avatarDiv.classList.add('bg-gray-400');
}

// 3.在文件末尾添加以下函数
function showLoading() {
  window.LoadingUtil.show();
}

// 4. 隐藏加载指示器
function hideLoading() {
  window.LoadingUtil.hide();
}


// 5. 获取更多图片
function get_more_images(callback) {

  // 获取 JSON 对象
  const localUser = LocalStorageUtil.getUserObject();
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

  const jsonData = {
    "opt": "10", // 10是获取视频列表
    // "google_token": response.credential,
    "uid": localUser.uid, // "12", // localUser.uid,
    "project_id": GlobalConfig.project_id,
    "product_id": GlobalConfig.product_id, // 默认产品ID
    "device_info": "6789",
    "page_number": "1",
  };

  const jsonString = JSON.stringify(jsonData);
  console.log(jsonString);

  // url = "http://fakeaddressgenerator.info:39600/go/lo/" + jsonString
  // url = "http://localhost:39603/go/lo/" + jsonString
  // url = GlobalConfig.url + '/go/v/get_more'
  url = GlobalConfig.url + '/go/p/get_more'
  console.log(url);

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Custom-Header': 'CustomValue' // 其他自定义头部
    },
    body: jsonString
  })
    .then(response => {
      // 检查响应的状态码
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      // 将响应解析为 JSON
      return response.json();
    })
    .then(data => {
      // 处理解析后的数据
      console.log('post 请求成功:', data);
      console.log("返回的错误码: ", data.code);
      console.log("返回的总页数: ", data.base_ext0);
      try {
        // const parsedData = JSON.parse(data);
        const parsedData = data;
        const videos = parsedData.data; // 视频列表

        if (videos.length > 0) {
          console.log("有图片");
          image0 = videos[0];
          console.log("视频地址:", image0.video_url);
          console.log("视频标题:", image0.video_title);
          console.log("视频封面:", image0.ext0);
        }

        // 在数据处理完成后调用回调函数，并传入需要的数据
        if (typeof callback === 'function') {
          callback(videos, data.base_ext0);   // 视频列表和总页码
        }

      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    })
    .catch(error => {
      // 处理请求错误
      console.error('GET 请求失败:', error);
    })
    .finally(() => {
      hideLoading(); // 隐藏加载指示器
    });
}


//6. 获取更多视频
function get_more_videos(callback) {

  // 获取 JSON 对象
  const localUser = LocalStorageUtil.getUserObject();
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

  const jsonData = {
    "opt": "10", // 10是获取视频列表
    // "google_token": response.credential,
    "uid": localUser.uid,
    "project_id": GlobalConfig.project_id,
    "product_id": GlobalConfig.product_id, // 默认产品ID
    "device_info": "6789",
    "page_number": "1",
  };

  const jsonString = JSON.stringify(jsonData);
  console.log(jsonString);

  // url = "http://fakeaddressgenerator.info:39600/go/lo/" + jsonString
  // url = "http://localhost:39603/go/lo/" + jsonString
  url = GlobalConfig.url + '/go/v/get_more'
  console.log(url);

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Custom-Header': 'CustomValue' // 其他自定义头部
    },
    body: jsonString
  })
    .then(response => {
      // 检查响应的状态码
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      // 将响应解析为 JSON
      return response.json();
    })
    .then(data => {
      // 处理解析后的数据
      console.log('post 请求成功:', data);
      console.log("返回的错误码: ", data.code);
      console.log("返回的总页数: ", data.base_ext0);
      try {
        // const parsedData = JSON.parse(data);
        const parsedData = data;
        const videos = parsedData.data; // 视频列表

        if (videos.length > 0) {
          console.log("有视频，一共", videos.length, "个");
          videos.forEach(video => {
            console.log("视频地址:", video.video_url);
            console.log("视频标题:", video.video_title);
            console.log("视频封面:", video.ext0);
          });
        }

        // 在数据处理完成后调用回调函数，并传入需要的数据
        if (typeof callback === 'function') {
          callback(videos, data.base_ext0);   // 视频列表和总页码
        }

      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    })
    .catch(error => {
      // 处理请求错误
      console.error('GET 请求失败:', error);
    })
    .finally(() => {
      hideLoading(); // 隐藏加载指示器
    });
}
