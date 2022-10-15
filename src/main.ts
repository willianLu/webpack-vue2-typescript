import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 样式重置
import "@/assets/css/index.less";
import "@/config/index";

// 本地开发环境，走mock数据
if (process.env.NODE_ENV === "development") {
  import("./mock");
}
import "./init";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
