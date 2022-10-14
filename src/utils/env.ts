/**
 * @description 环境类型
 */
enum EnvTypes {
  qa = "qa",
  uat = "uat",
  test = "test",
  prod = "prod",
}

interface Env {
  type: string;
  isDev: boolean;
  isQa: boolean;
  isUat: boolean;
  isTest: boolean;
  isProd: boolean;
}

// 开发环境
const isDev = process.env.NODE_ENV === "development";
let type = "dev";

// 匹配环境类型
const ExpEnv = [
  {
    type: "qa",
    exp: ".qa.",
  },
  {
    type: "uat",
    exp: ".uat.",
  },
  {
    type: "test",
    exp: ".t.",
  },
  {
    type: "prod",
    exp: ".prod.",
  },
];
// 开发环境无需初始化
if (!isDev) {
  // 初始化环境类型
  ExpEnv.some((item) => {
    if (window.location.hostname.indexOf(item.exp) > -1) {
      type = item.type;
      return true;
    }
  });
}

// 运行环境
const env: Env = {
  type,
  isDev,
  isQa: type === EnvTypes.qa,
  isUat: type === EnvTypes.uat,
  isTest: type === EnvTypes.test,
  isProd: type === EnvTypes.prod,
};

export default env;
