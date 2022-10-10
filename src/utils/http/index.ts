import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
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
  return HttpRequest.request(config);
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
  config.params = params;
  return HttpRequest.get(url, config).catch((error) => error);
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
  return HttpRequest.post(url, data, config).catch((error) => error);
}

export default HttpRequest;
