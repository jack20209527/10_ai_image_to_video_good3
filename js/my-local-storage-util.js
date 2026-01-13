class LocalStorageUtil {
  // 保存 JSON 对象到 localStorage
  static saveUserObject(jsonObject) {
    this.saveJsonObject("user_info", jsonObject)
  }


  // 从 localStorage 获取 JSON 对象
  static getUserObject() {
    return this.getJsonObject("user_info")
  }

  // 清除特定键的数据
  static removeUserItem() {
    this.removeItem("user_info")
  }


  // 保存 JSON 对象到 localStorage
  static saveJsonObject(key, jsonObject) {
    try {
      const jsonString = JSON.stringify(jsonObject);
      localStorage.setItem(key, jsonString);
    } catch (error) {
      console.error('Error saving JSON object to localStorage:', error);
    }
  }

  // 从 localStorage 获取 JSON 对象
  static getJsonObject(key) {
    try {
      const jsonString = localStorage.getItem(key);
      if (jsonString) {
        return JSON.parse(jsonString);
      } else {
        console.warn(`No data found in localStorage for key: ${key}`);
        return null;
      }
    } catch (error) {
      console.error('Error parsing JSON from localStorage:', error);
      return null;
    }
  }

  // 清除特定键的数据
  static removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item from localStorage for key: ${key}`, error);
    }
  }

  // 清除所有 localStorage 数据
  static clearAll() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

}

