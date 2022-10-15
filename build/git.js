const log = require("./log");
const execa = require("./execa");

/**
 * @description 获取git当前分支
 * @returns {string}
 */
function getCurrentBranch() {
  const res = execa("git rev-parse --abbrev-ref HEAD");
  if (res.code === 0) {
    return res.message.trim();
  }
}

/**
 * @description 创建git tag
 * @param {string} name git tag 名称
 * @returns {void}
 */
function createTag(name) {
  log.info("开始创建git tag");
  // 创建git tag
  let res = execa(`git tag -a ${name} -m '构建版本${name}'`, {
    stdio: "inherit",
  });
  if (res.code !== 0) {
    log.error("创建git tag失败");
    return false;
  }
  // 上传git tag到远程仓库
  res = execa(`git push origin ${name}`, {
    stdio: "inherit",
  });
  if (res.code !== 0) {
    log.error("git tag push远程失败");
    return false;
  }
  log.success("构建版本tag成功");
  return true;
}

/**
 * @description 获取git文件状态
 * @returns {string}
 */
function getGitStatus() {
  log.info("获取git仓库本地文件状态");
  const res = execa("git status -s");
  if (res.code !== 0) {
    log.error("获取git仓库本地文件状态失败");
    return false;
  }
  if (res.message) {
    log.error("git暂存区存在改动文件未提交，不允许打包");
    return false;
  }
  return true;
}

/**
 * @description 同步git仓库文件
 */
function syncGitRepository() {
  log.info("拉取远程git仓库文件");
  let res = execa("git pull");
  if (res.code !== 0) {
    log.error("拉取远程仓库失败");
    return false;
  }
  log.info("将本地仓库文件同步到远程仓库");
  res = execa("git push");
  if (res.code !== 0) {
    log.error("本地仓库文件同步到远程仓库失败");
    return false;
  }
  return true;
}

module.exports = {
  getCurrentBranch,
  createTag,
  getGitStatus,
  syncGitRepository,
};
