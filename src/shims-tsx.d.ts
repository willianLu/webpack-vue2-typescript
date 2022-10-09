import Vue, { VNode } from "vue";

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

import { BaseLoading } from "./components/loading";
declare module "vue/types/vue" {
  // 声明为 Vue 补充的东西
  interface Vue {
    $loading: BaseLoading;
  }
}
