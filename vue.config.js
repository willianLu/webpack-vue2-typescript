const merge = require("webpack-merge");
const tsImportPluginFactory = require("ts-import-plugin");
const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  devServer: {
    port: 6800,
  },
  productionSourceMap: !isProduction,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          // 手机端单位适配
          require("postcss-px-to-viewport")({
            unitToConvert: "px", // 需要转换的单位，默认为"px"
            viewportWidth: 750, //  设计稿的视口宽度
            unitPrecision: 5, // 单位转换后保留的精度
            propList: ["*"], // 能转化为vw的属性列表
            viewportUnit: "vw", //  希望使用的视口单位
            fontViewportUnit: "vw", // 字体使用的视口单位
            selectorBlackList: [], // 需要忽略的CSS选择器
            minPixelValue: 1, // 最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, // 媒体查询里的单位是否需要转换单位
            replace: true, // 是否直接更换属性值，而不添加备用属性
            exclude: /node_modules/, // 忽略某些文件夹下的文件或特定文件
            include: undefined, // 如果设置了include，那将只有匹配到的文件才会被转换，例如只转换 'src/mobile' 下的文件 (include: /\/src\/mobile\//)
            landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            landscapeUnit: "vw", // 横屏时使用的单位
            landscapeWidth: 568, // 横屏时使用的视口宽度
          }),
        ],
      },
    },
  },
  pluginOptions: {
    // 增加less全局预设变量
    // 需要安装style-resources-loader 和 vue-cli-plugin-style-resources-loader
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/assets/css/preset.less")],
    },
  },
  configureWebpack: {
    optimization: {
      // 分包优化
      splitChunks: {
        cacheGroups: {
          // 将vue\vue-router\vuex统一打包在一起
          vueVendor: {
            test: /[\\/]node_modules[\\/](vue|vue-router|vuex)[\\/]/,
            name: "vue-vendor",
            chunks: "all",
          },
          // 将svg icon统一打包在一起
          svgIcons: {
            test: /[\\/]icons[\\/]svg[\\/]/,
            name: "svg-icons",
            chunks: "all",
          },
        },
      },
    },
    // 开启gizp压缩
    plugins: [new CompressionPlugin()],
  },
  chainWebpack: (config) => {
    config.module
      .rule("ts")
      .use("ts-loader")
      .tap((options) => {
        // vant 组件按需加载
        return merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: "vant",
                libraryDirectory: "es",
                style: true,
              }),
            ],
          }),
          compilerOptions: {
            module: "es2015",
          },
        });
      })
      .end();
    // svg icon处理
    config.module.rule("svg").exclude.add(path.resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(path.resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();

    // 生产环境打包处理
    if (isProduction) {
      config.optimization.minimizer("terser").tap((args) => {
        Object.assign(args[0].terserOptions.compress, {
          // 生产环境删除debugger
          drop_debugger: true,
          // 生产环境删除console
          drop_console: true,
        });
        return args;
      });
    }
  },
};
