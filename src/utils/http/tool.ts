// import { isObject } from "@/utils/util";

/**
 * @description 请求返回数据
 * @param {*}
 * @returns {void}
 */
export interface CustomResponseData<T = any> {
  code: number;
  message: string;
  data: T;
}
/**
 * @description 处理自定义返回数据
 * @param {string} code 返回 code
 * @param {string | undefined} message 返回信息
 * @returns {object}
 */
export function handleCustomResponseData<T = any>(
  code: number,
  message?: string,
  data?: T
): CustomResponseData<T> {
  return {
    code,
    message: message || "",
    data: <T>data,
  };
}

/**
 * @description url拼接
 * @param {String} baseUrl 基础域名
 * @param {String} url 请求链接地址
 * @returns {String} 完整的请求地址
 */
// function joinUrl(baseUrl, url) {
//   if (baseUrl.lastIndexOf("/") === baseUrl.length - 1) {
//     baseUrl = baseUrl.substr(baseUrl.length - 1);
//   }
//   if (url.indexOf("/") !== 0) {
//     url = "/" + url;
//   }
//   return baseUrl + url;
// }

/**
 * @description 处理域名规则，多域名服务器预发环境处理
 * @param {Object} options 请求配置数据
 * @returns {String} 处理后的url地址
 */
// function handleDomainRule(url) {
//   const { domainMap, baseUrl } = Config;
//   let isNeedBaseUrl = true;
//   url = String(url).trim();
//   if (!Env.isProduct && domainMap && isObject(domainMap)) {
//     Object.keys(domainMap).some((key) => {
//       // 使用indexOf判断，预订域名与配置一致，减少处理逻辑
//       if (url.indexOf(key) === 0) {
//         url = url.replace(key, domainMap[key]);
//         isNeedBaseUrl = false;
//         return true;
//       }
//     });
//   }
//   // 未配置域名信息，则执行基础域名拼接
//   if (
//     isNeedBaseUrl &&
//     baseUrl &&
//     ["http://", "https://", "//"].every((key) => url.indexOf(key) !== 0)
//   ) {
//     return joinUrl(baseUrl, url);
//   }
//   return url;
// }

/**
 * @description 处理公共参数
 * @param {Object} 请求相关数据
 * @returns {void}
 */
// function handleCommonParams(options) {
//   const { method, params, data, isFormData, skipCommonData } = options;
//   const { traceId, userId, openId, unionId } = Env;
//   const commonParams = {
//     traceId,
//     userId,
//     openId,
//     unionId,
//   };
//   // 参数处理
//   let _data = method === "get" ? params : data;
//   // 不跳过公共参数处理，且参数是对象
//   if (!skipCommonData && isObject(_data)) {
//     _data = { ...commonParams, ..._data };
//   }
//   // formData数据，特殊处理
//   _data = isFormData ? stringifyQuery(_data) : _data;

//   if (method === "get") {
//     options.params = _data;
//   } else {
//     options.data = _data;
//   }
// }

/**
 * @description 处理请求规则，多域名解析，请求公共参数
 * @param {Object} options 请求相关数据
 * @returns {void}
 */
// export function handleRequestRule(options) {
//   // 请求URL处理
//   options.url = handleDomainRule(options.url);
//   // 公共参数处理
//   handleCommonParams(options);
//   return options;
// }
