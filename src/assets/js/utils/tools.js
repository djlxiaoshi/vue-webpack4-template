
export function formatData (params) {
  const queryStrArr = [];
  Object.keys(params).forEach(key => {
    const value = params[key];
    let queryStr = encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    if (Array.isArray(value)) {
      queryStr = encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify(params[key]));
    }
    queryStrArr.push(queryStr);
  });
  return queryStrArr.join('&');
}

/**
 * 获取 0 ~ num 的随机数（闭区间）
 */
export function randomNum (num) {
  return Math.floor(Math.random() * (num + 1));
}

/**
 * 是否是空对象
 * @param obj
 * @returns {boolean}
 */
export function isNullObject (obj) {
  if (Object.keys) {
    return Object.keys(obj).length > 0;
  } else {
    for (let i in obj) {
      if (Object.hasOwnProperty(i)) {
        return true;
      }
    }
    return false;
  }
}
