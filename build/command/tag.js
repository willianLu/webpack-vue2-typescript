const {
  getCurrentBranch,
  getGitStatus,
  syncGitRepository,
  createTag,
} = require("../git");

const config = require("../config");
const log = require("../log");

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
};

/**
 * @description 验证当前分支是否可以打包
 * @param {string} currentBranch 当前分支
 * @param {object} envConf 环境配置信息
 * @returns {boolean}
 */
function validateBuildBranch(currentBranch, envConf) {
  return (
    (envConf.isStage &&
      config.buildBranchRules.stage.find((item) => item === currentBranch)) ||
    (envConf.isStage2 &&
      config.buildBranchRules.stage2.find((item) => item === currentBranch))
  );
}

// 生成版本号
function buildVersion() {
  const now = new Date();
  return (
    "" +
    now.getFullYear() +
    ("00" + (now.getMonth() + 1)).slice(-2) +
    ("00" + now.getDate()).slice(-2) +
    ("00" + now.getHours()).slice(-2) +
    ("00" + now.getMinutes()).slice(-2)
  );
}

/**
 * @description 打包构建命令
 * @param {string} env 构建环境
 * @param {object} options 构建参数
 * @returns {void}
 */
function buildTag(env, options) {
  // 获取环境配置
  let envConf = envConfig[env] || "";
  const currentBranch = getCurrentBranch();
  if (!envConf && currentBranch === "dev") {
    envConf = envConfig.stage;
  }
  if (!envConf) {
    log.error("未知环境，不允许打包");
    log.warn("- 请指定打包环境 -");
    log.warn("预发：stage, 产线：stage2");
    return process.exit(1);
  }
  log.info(`${envConf.label}构建打包`);
  log.debug(`当前构建分支:`, currentBranch);
  // 需要git相关检测，非预发环境或者非忽略
  const needGitCheck = !options.ignore;
  if (needGitCheck && !validateBuildBranch(currentBranch, envConf)) {
    log.error("当前分支不允许构建打包");
    log.warn(
      "允许构建打包分支：",
      `[环境 - 分支] [stage - ${config.buildBranchRules.stage.join(
        " | "
      )}] [stage2 - ${config.buildBranchRules.stage2.join(" | ")}]`
    );
    return process.exit(1);
  }
  // 同步git本地仓库与远程仓库文件
  if (!syncGitRepository()) {
    return process.exit(1);
  }
  // 检测文件是否有变化
  if (!getGitStatus()) {
    return process.exit(1);
  }
  // 开发构建git tag
  const tagName = envConf.type + "_" + buildVersion();
  if (createTag(tagName)) {
    // 项目构建成功
    log.success("本次构建项目成功!");
    log.success(`构建版本：${tagName}`);
    log.success(`构建环境：${envConf.label}`);
  } else {
    log.error("本次构建项目失败!");
  }
}

module.exports = buildTag;
