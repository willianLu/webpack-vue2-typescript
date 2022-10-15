/**
 * @description 打包命令处理
 * webpack 打包，上传狮子座
 */
const fs = require("fs");
const execa = require("../execa");
const config = require("../config");
const log = require("../log");
const { resolve } = require("../util");

// 环境配置
const envConfig = {
  stage: {
    isStage: true,
    type: "stage",
    label: "预发1",
  },
  stage2: {
    isStage2: true,
    type: "stage2",
    label: "预发2",
  },
  prod: {
    isProd: true,
    type: "prod",
    label: "产线",
  },
};

/**
 * @description 执行国际站venus项目打包
 * @param {object} envConf 环境配置信息
 * @param {string} tag 构建git tag版本
 * @returns {void}
 */
function buildVenus(envConf, tag) {
  log.debug("开始webpack打包");
  // 执行JS编译操作
  const res = execa(
    `cross-env GIT_TAG=${tag} vue-cli-service build --mode ${envConf.type}`,
    {
      stdio: "inherit",
    }
  );
  if (res.code === 0) {
    log.success("webpack打包成功!");
  } else {
    log.error("webpack打包失败!");
  }
  return res.code === 0;
}

/**
 * @description 读取上传文件地址
 * @param {string} fileDir 本地文件地址
 * @param {string} uploadPath 上传文件夹路径
 * @param {array} uploadDirArr 上传文件信息
 * @returns {void}
 */
function readFileAddress(fileDir, uploadPath, uploadDirArr) {
  // 读取需要上传的文件
  fs.readdirSync(fileDir).forEach((item) => {
    const filePath = resolve(`${fileDir}/${item}`);
    // 是文件地址方可上传，将可上传的文件加入缓存
    if (fs.lstatSync(filePath).isDirectory()) {
      readFileAddress(filePath, `${uploadPath}${item}/`, uploadDirArr);
    } else if (fs.lstatSync(filePath).isFile()) {
      uploadDirArr.push({
        filePath,
        uploadPath: config.leonid.uplodFileDir + uploadPath,
      });
    }
  });
}

module.exports = async function build(env, options) {
  // 获取环境配置
  const envConf = envConfig[env] || "";
  let message = "";
  if (!envConf) {
    message = "未知环境，不允许打包";
    log.error(message);
    return process.exit(1);
  }
  // 判断是否存在版本tag
  if (!options.tag || typeof options.tag !== "string") {
    log.error("缺少构建版本(git tag)参数");
    return process.exit(1);
  }
  if (!buildVenus(envConf, options.tag)) {
    log.error(`「版本${options.tag}」webpack打包失败`);
    return process.exit(1);
  }
  if (envConf.isProd) {
  }
  log.success("本次构建项目成功!");
  log.success(`构建版本：${options.tag}`);
  log.success(`构建环境：${envConf.label}`);
};
