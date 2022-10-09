import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Loading from "./components/loading";

Vue.config.productionTip = false;
Vue.prototype.$loading = Loading;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
