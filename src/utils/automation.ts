import { isFunction } from "./util";

type HandleFileName = (name: string) => string | undefined;

interface ImportAllOptions {
  filter?: (name: string) => boolean;
  type?: string;
  valueType?: string;
  handleFileName?: HandleFileName;
}

/**
 * @description 前端工程自动化 - 依赖管理
 * @param {function} jsModules 读取的js模块，requir.context
 * @param {undefined|object} options filter: 过滤函数; type: 返回数据类型 array | object;
 * handleFileName: 处理文件名称，返回string | undefuned; valueType: 取值逻辑
 * @returns {void}
 */
export function importAll(
  jsModules: __WebpackModuleApi.RequireContext,
  options?: ImportAllOptions
) {
  // 模块数据集合
  let moduleMap: string[] = jsModules.keys();
  options = options || {};
  const { filter, type, valueType = "default" } = options;
  let handleFileName: HandleFileName = function (key: string) {
    const child = key.match(/.*\/(.+)\.ts$/);
    if (child) {
      return child[1];
    }
  };
  // 存在自定义处理方法时，使用自定义方法
  if (isFunction(options.handleFileName)) {
    handleFileName = <HandleFileName>options.handleFileName;
  }
  // 过滤掉不需要处理的文件
  if (filter && isFunction(filter)) {
    moduleMap = moduleMap.filter((item: string) => filter(item));
  }
  const isArr = type === "array";
  // 缓存数据集合
  const cacheMap: Record<string, any> = {};
  let cacheArr: any[] = [];
  // 解析模块
  moduleMap.forEach((key) => {
    const data = jsModules(key);
    if (isArr) {
      Array.isArray(data.default) && (cacheArr = cacheArr.concat(data.default));
    } else {
      const fileName = handleFileName(key);
      if (fileName) {
        cacheMap[fileName] = valueType === "default" ? data.default : data;
      }
    }
  });
  return isArr ? cacheArr : cacheMap;
}
