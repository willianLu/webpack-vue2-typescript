import Vue from "vue";
import Overlay from "./LoadingOverlay.vue";
import { isObject, isString, isNumber } from "@/utils/util";
import { Toast } from "vant";

// 延迟显示 - 占位背景实例
const OverlayInstance = Vue.extend(Overlay);

// loading的延迟遮罩组件实例
const loadingOverlay = new OverlayInstance().$mount(
  document.createElement("div")
);
// 安装占位背景实例
document.body.appendChild(loadingOverlay.$el);
// loading弹层实例
let TOAST: any;
// 显示loading弹层
function showLoading(message?: string) {
  TOAST = Toast.loading({
    message,
    duration: 0,
    forbidClick: true,
  });
}
// timeout延迟id
let timerId: null | number = null;
// 清楚执行中的timeout
function closeTimeout() {
  // 清楚上一次的延迟操作
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }
}

/**
 * @description loading 参数
 */
interface LoadingOptions {
  message?: string;
  delayTime?: number;
  force?: boolean;
}

/**
 * 全局插件形式注册组件
 */
const Loading = {
  /**
   * @description 显示loading使用方法说明
   * @param {Number,String,LoadingOptions} options 不传参，默认为空对像
   * Number 类型时，只代表loading的延迟时长
   * String 类型时，只代表loading的text提示文字
   * LoadingOptions 类型时，{ text, delayTime }
   *   --  text 提示文字
   *   --  delayTime 延迟时长
   *   --  force 立即执行
   */
  show(options?: number | string | LoadingOptions) {
    // 清楚上一次的延迟操作
    closeTimeout();
    console.log(loadingOverlay, "================测试");
    //显示延迟使用遮罩层
    (<any>loadingOverlay).visible = true;
    // 持续时长，用于延迟显示loading策略
    let delayTime = 500;
    let message = "";
    let isForce = false;
    if (isString(options)) {
      message = <string>options;
    } else if (isNumber(options)) {
      delayTime = <number>options;
    } else if (isObject(options)) {
      message = (<LoadingOptions>options).message || "";
      if (isNumber((<LoadingOptions>options).delayTime)) {
        delayTime = (<LoadingOptions>options).delayTime as number;
      }
      isForce = !!(<LoadingOptions>options).force;
    }
    if (isForce || delayTime <= 0) {
      showLoading(message);
    } else {
      // 延迟执行loading操作
      timerId = setTimeout(() => {
        timerId = null;
        showLoading(message);
      }, delayTime);
    }
  },
  hide() {
    // 清楚上一次的延迟操作
    closeTimeout();
    // 关闭遮罩层组件
    (<any>loadingOverlay).visible = false;
    if (TOAST) {
      TOAST.clear();
      TOAST = null;
    }
  },
};

export default Loading;
