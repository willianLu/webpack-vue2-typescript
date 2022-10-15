import Vue from "vue";
import { Toast, Dialog } from "vant";
import Loading from "@/components/loading";
import "./icons";

Vue.prototype.$loading = Loading;
// toast提示框
Vue.prototype.$toast = Toast;
// alert提示
Vue.prototype.$alert = Dialog.alert;
// 弹窗确认窗
Vue.prototype.$confirm = Dialog.confirm;
