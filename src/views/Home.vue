<template>
  <div class="home">
    <div class="flex border-all">
      <div class="hairline-border-all">all</div>
      <div class="hairline-border-top">top</div>
      <div class="hairline-border-right">right</div>
      <div class="hairline-border-bottom">bottom</div>
      <div class="hairline-border-left">left</div>
    </div>
    <div>
      <svg-icon name="close" />
      <svg-icon name="delete" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SvgIcon from "@/components/SvgIcon.vue";
import { deferFun } from "@/utils/util";
import { queryUserInfo, queryBookList } from "@/services/index";

@Component({
  components: {
    SvgIcon,
  },
})
export default class ViewHome extends Vue {
  async created() {
    this.$loading.show();
    await deferFun();
    this.$loading.hide();
    this.$toast("提示文字");
    this.getUserInfo();
    this.getBookList();
  }

  async getUserInfo() {
    const res = await queryUserInfo();
    console.log(res);
  }

  async getBookList() {
    const res = await queryBookList();
    console.log(res, "==============获取列表");
  }
}
</script>

<style lang="less" scoped>
.border-all {
  div {
    margin: 16px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    background-color: @background-color;
  }
}
</style>
