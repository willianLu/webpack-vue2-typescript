import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import interceptors from "./interceptors";
import { CustomResponseData } from "./tool";

// 创建请求实例
const HttpRequest: AxiosInstance = axios.create({});

// 注册请求request拦截器
HttpRequest.interceptors.request.use(
  interceptors.request.onFufilled,
  interceptors.request.onRejected
);

// 注册请求response拦截器
HttpRequest.interceptors.response.use(
  interceptors.response.onFufilled,
  interceptors.response.onRejected
);
/**
 * @description request请求方式，包含get\post\put\delete\head\options\patch等
 */
export function request<T, D>(
  config: AxiosRequestConfig<D>
): Promise<CustomResponseData<T>> {
  return new Promise((resolve) => {
    HttpRequest.request(config)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        resolve(error);
      });
  });
}

/**
 * @description Get请求方法
 * @param {string} url 请求地址
 * @param {any} params 请求参数
 * @param {object | undefined} config 配置参数
 * @returns {Promise<any>}
 */
export function get<T, D>(
  url: string,
  params?: D,
  config?: AxiosRequestConfig<D>
): Promise<CustomResponseData<T>> {
  config = config || {};
  return request({
    ...config,
    url,
    method: "get",
    params,
  });
}

/**
 * @description Post请求方法
 * @param {string} url 请求地址
 * @param {object | undefined} params 请求参数
 * @param {object | undefined} config 配置参数
 * @returns {Promise<any>}
 */
export function post<T, D>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>
): Promise<CustomResponseData<T>> {
  config = config || {};
  return request({
    ...config,
    url,
    method: "post",
    data,
  });
}

export default HttpRequest;
