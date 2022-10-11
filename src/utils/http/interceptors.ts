import { AxiosRequestConfig, AxiosResponse } from "axios";
import { isError } from "../util";
import { handleCustomResponseData } from "./tool";

// 发出请求前拦截
const request = {
  /**
   * @description 发送请求拦截，处理请求参数
   * @param {object} options 请求配置
   * @returns {object} 处理后的配置数据
   */
  onFufilled<D>(config: AxiosRequestConfig<D>) {
    return config;
  },
  /**
   * @description 发送请求错误拦截
   * @param {any} error 请求错误信息
   * @returns {Promise} 返回错误信息
   */
  onRejected(error: any) {
    const isResponseError = error && isError(error);
    if (isResponseError) {
      console.group("接口请求request错误");
      console.error(error);
      console.groupEnd();
    }
    return Promise.reject(
      handleCustomResponseData(-1, isResponseError ? error.message : "", error)
    );
  },
};

// 请求返回拦截
const response = {
  /**
   * @description 请求返回拦截，处理返回参数
   * @param {AxiosResponse} response 请求reponse对象
   * @returns {AxiosResponse} 返回response对象
   */
  onFufilled<T, D>(response: AxiosResponse<T, D>): AxiosResponse<T, D> {
    return response;
  },
  /**
   * @description 请求返回错误拦截
   * @param {any} error response错误信息
   * @returns {Promise} 返回错误信息
   */
  onRejected(error: any) {
    const isResponseError = error && isError(error);
    if (isResponseError) {
      console.group("接口请求reponse错误");
      console.error(error);
      console.groupEnd();
    }
    return Promise.reject(
      handleCustomResponseData(-1, isResponseError ? error.message : "", error)
    );
  },
};

export default {
  request,
  response,
};
