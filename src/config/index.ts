import Env from "@/utils/env";
import { importAll } from "@/utils/automation";
import merge from "@/utils/merge";

const envConfig = importAll(require.context("./", true, /\.ts$/), {
  filter(name) {
    return name !== "./index.ts";
  },
  handleFileName(key) {
    const name = key.match(/^\.(.+)\.(.+)\.ts$/);
    if (name) {
      return name[2];
    }
  },
});
const Config = merge(envConfig.default || {}, envConfig[Env.type] || {});

console.log(Config, "================配置");

export default Config;
