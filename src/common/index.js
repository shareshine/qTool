/**
 * 通用方法
 *
 * generateUUID - 生成uuid
 * getDeviceId - 获取deviceId
 * getParameter - 获取url中的参数
 * loadScript - 动态加载js
 * addURLParameter - 向url中添加search参数
 * updateURLParameter - 更新url中的search参数
 * removeURLParameter - 删除url中的search参数
 * getRepetition - 获取多个对象数组中的共同项
 */
class Common {
  /**
   * 生成uuid
   *
   * @return uuid
   * @example
   *
   * generateUUID();
   * // => cd2f4b1f-daf2-451c-a9a6-db716c1d82bb
   */
  generateUUID = () => {
    /* eslint-disable no-bitwise */
    /* eslint-disable no-mixed-operators */
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  };

  /**
   * 获取deviceId
   *
   * @param {String} [key='deviceId'] - 存储标识
   */
  getDeviceId = (key = 'deviceId') => {
    let deviceId = localStorage.getItem(key);
    if (!deviceId) {
      deviceId = this.generateUUID();
      localStorage.setItem(key, deviceId);
    }
    return deviceId;
  };

  /**
   * 获取url中的参数
   *
   * @param {String} name - 参数名
   * @param {String} [url=window.location.search] - 链接
   * @return {String} 参数值
   * @example
   *
   * getParameter('name', 'http://www.w3school.com?name=xxx');
   * // => xxx
   */
  getParameter = (name, url = window.location.search) => {
    const regexp = new RegExp(`[?&]${name}=([^&]*)`, 'ig');
    const result = regexp.exec(url);
    return result === null ? '' : decodeURIComponent(result[1]);
  };

  /**
   * 动态加载js
   *
   * @param {String} url - js链接地址
   * @param {Function} [callback] - 回调
   */
  loadScript = (url, callback) => {
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('charset', 'utf-8');
    script.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(script);
    if (script.readyState) {
    // IE
      script.onreadystatechange = () => {
        if (/loaded|complete/.test(script.readyState)) {
          script.onreadystatechange = null;
          if (callback && typeof callback === 'function') {
            callback();
          }
        }
      };
    } else {
      script.onload = () => {
        script.onload = null;
        if (callback && typeof callback === 'function') {
          callback();
        }
      };
    }
  };

  /**
   * 向url中添加search参数
   *
   * @param {String} url - 链接
   * @param {String} paramName - 参数名称
   * @param {String} paramVal - 参数值
   * @return {String} 拼接好的url
   */
  addURLParameter = (url, paramName, paramVal) => {
    const oriUrls = url.split('#');
    let temp = url;
    let additionalURL = '';
    if (oriUrls.length > 0) {
      temp = oriUrls[0];
    }
    if (oriUrls.length > 1) {
      additionalURL = `#${oriUrls[1]}`;
    }
    const tempArray = temp.split('?');
    if (tempArray.length < 2) {
      return `${temp}?${paramName}=${encodeURIComponent(paramVal)}${additionalURL}`;
    }
    return `${temp}&${paramName}=${encodeURIComponent(paramVal)}${additionalURL}`;
  };

  /**
   * 更新url中的search参数
   *
   * @param {String} url - 链接
   * @param {String} paramName - 参数名称
   * @param {String} paramVal - 参数值
   * @return {String} 更新参数后的url
   */
  updateURLParameter = (url, param, paramVal) => {
    let TheAnchor = null;
    let newAdditionalURL = '';
    let tempArray = url.split('?');
    let baseURL = tempArray[0];
    let additionalURL = tempArray[1];
    let temp = '';

    if (additionalURL) {
      const tmpAnchor = additionalURL.split('#');
      const TheParams = tmpAnchor[0];
      TheAnchor = tmpAnchor[1];
      if (TheAnchor) {
        additionalURL = TheParams;
      }
      tempArray = additionalURL.split('&');
      for (let i = 0; i < tempArray.length; i++) {
        if (tempArray[i].split('=')[0] !== param) {
          newAdditionalURL += temp + tempArray[i];
          temp = '&';
        }
      }
    } else {
      const tmpAnchor = baseURL.split('#');
      const TheParams = tmpAnchor[0];
      TheAnchor = tmpAnchor[1];
      if (TheParams) {
        baseURL = TheParams;
      }
    }

    if (TheAnchor) {
      paramVal += `#${TheAnchor}`;
    }
    return `${baseURL}?${newAdditionalURL}${temp}${param}=${paramVal}`;
  };

  /**
   * 删除url中的search参数
   *
   * @param {String} url - 链接
   * @param {String} paramName - 参数名称
   * @return {String} 删除参数后的url
   */
  removeURLParameter = (url, paramName) => {
    const oriUrls = url.split('#');
    let temp = url;
    let additionalURL = '';
    if (oriUrls.length > 0) {
      temp = oriUrls[0];
    }
    if (oriUrls.length > 1) {
      additionalURL = `#${oriUrls[1]}`;
    }

    const tempArray = temp.split('?');
    if (tempArray.length < 2) {
      return url;
    }

    const params = tempArray[1].split('&'); // 参数对的数组
    let newParams = '';
    let tmp = '';
    for (let i = 0; i < params.length; i++) {
      if (params[i].split('=')[0] !== paramName) {
        newParams += tmp + params[i];
        tmp = '&';
      }
    }

    let newUrl = '';
    if (newParams !== '') {
      newUrl = `${tempArray[0]}?${newParams}${additionalURL}`;
    } else {
      newUrl = tempArray[0] + additionalURL;
    }
    return newUrl;
  }

  /**
   * 获取多个对象数组中的共同项
   * @param {Array} targetArr - 对比数组
   * @param {String} key - 对比项
   * @return {Array} 共同项组成的数组
   */
  getRepetition(key, ...targetArray) {
    if (!key) {
      throw Error('必须传入对比项');
    }
    const temp = targetArray.reduce((arr, obj) => {
      if (obj instanceof Array) {
        return arr.concat(obj);
      }
      console.warn('除了key以外的入参都必须为数组');
      return [];
    }, []);
    const memory = {};
    const newArray = [];
    temp.forEach(obj => {
      const value = obj[key];
      if (memory[value]) {
        memory[value]++;
      } else {
        memory[value] = 1;
      }
      if (memory[value] === targetArray.length) {
        newArray.push(obj);
      }
    });
    return newArray;
  }
}

export default new Common();
