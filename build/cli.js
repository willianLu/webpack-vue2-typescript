const log = require("./log");
const { build, buildTag } = require("./command");
const { program } = require("commander");

log.info("开始执行命令");

program
  .command("tag [env]")
  .description("慧行国际站生成打包tag")
  .option("-i, --ignore", "预发环境打包，忽略git分支和暂存区检测")
  .action(buildTag);

program
  .command("build [env]")
  .option("-t, --tag <tag>", "当前打包tag")
  .description("慧行国际站打包命令")
  .action(build);

program.configureOutput({
  // 将错误高亮显示
  outputError: (str) => log.error(str),
});

program.parse(process.argv);
