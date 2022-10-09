/**
 * @description 基础数据类型
 */
enum DataType {
  NUMBER = "number",
  STRING = "string",
  ARRAY = "array",
  OBJECT = "object",
  UNDEFINED = "undefined",
  NULL = "null",
  FUNCTION = "function",
  PROMISE = "promise",
  ERROR = "error",
}

/**
 * @description 判断数据
 * @param {any} data 任意值
 */
export function isDef(data: any): boolean {
  return data !== undefined && data !== null;
}

/**
 * @description 判断数据类型是否是传入的类型
 * @param {any} data 传入数据
 * @param {dataType} type 对比的数据类型
 * @returns {boolean} true | false
 */
function judgeDataType(data: any, type: string): boolean {
  return (
    Object.prototype.toString.call(data).toLocaleLowerCase() ===
    `[object ${type}]`
  );
}

/**
 * @description 判断数据类型是否是对象
 * @param {any} data 传入的数据
 * @returns {boolean} true | false
 */
export function isObject(data: any): boolean {
  return judgeDataType(data, DataType.OBJECT);
}

/**
 * @description 判断数据类型是否是函数
 * @param {any} data 传入的数据
 * @returns {boolean} true | false
 */
export function isFunction(data: any): boolean {
  return judgeDataType(data, DataType.FUNCTION);
}

/**
 * @description 判断数据类型是否是promise函数
 * @param {any} data 传入的数据
 * @returns {boolean} true | false
 */
export function isPromise(data: any): boolean {
  return judgeDataType(data, DataType.PROMISE);
}

/**
 * @description 判断数据类型是否是Error类型
 * @param {any} data 传入的数据
 * @returns {boolean} true | false
 */
export function isError(data: any): boolean {
  return judgeDataType(data, DataType.ERROR);
}

/**
 * @description 判断数据类型是否是数字
 * @param {any} data 传入的数据
 * @returns {boolean} true | false
 */
export function isNumber(data: any): boolean {
  return judgeDataType(data, DataType.NUMBER) && !window.isNaN(data);
}

/**
 * @description 判断数据类型是否是字符串
 * @param {any} data 传入的数据
 * @returns {boolean} true | false
 */
export function isString(data: any): boolean {
  return judgeDataType(data, DataType.STRING);
}

/**
 * @description 是否是空对象
 * @param {any} data
 * @returns {boolean}
 */
export function isEmptyObject(data: any): boolean {
  return isObject(data) && JSON.stringify(data) === "{}";
}
/**
 * @description 延迟函数
 * @param {undefuned | number} duration
 * @param {any} data
 * @returns {promise<any>}
 */
export function deferFun<T>(
  duration?: number,
  data?: T
): Promise<T | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, duration || 1000);
  });
}
