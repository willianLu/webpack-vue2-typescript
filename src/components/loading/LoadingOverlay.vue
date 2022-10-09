<template>
  <van-overlay
    :show="visible"
    :custom-style="{ backgroundColor: 'transparent' }"
    :z-index="100"
  ></van-overlay>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
// loading 延迟占位背景
// 用于延迟时，防止用户点击
import { Overlay } from "vant";

@Component({
  components: {
    [Overlay.name]: Overlay,
  },
})
export default class LoadingOverlay extends Vue {
  @Prop() visible = false;

  uninstall(): void {
    const { $el } = this;
    $el.parentNode && $el.parentNode.removeChild($el);
    this.$destroy();
  }
}
</script>
