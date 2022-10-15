<template>
  <div class="flex icon-container">
    <div v-for="(item, index) in list" :key="index" class="item">
      <svg-icon :name="item" />
      <div class="name">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SvgIcon from "@/components/SvgIcon.vue";
@Component({
  components: {
    SvgIcon,
  },
})
export default class ViewIcon extends Vue {
  list: string[] = [];
  created() {
    const requireContext = require.context("../icons/svg", false, /\.svg$/);
    const exp = /\.\/(.*)\.svg/;
    const list: string[] = [];
    requireContext.keys().map((key) => {
      const res = key.match(exp);
      if (res) {
        list.push(res[1]);
      }
    });
    this.list = list;
  }
}
</script>

<style lang="less" scoped>
.icon-container {
  flex-wrap: wrap;
  font-size: 68px;
  color: #00c777;
  .item {
    margin: 30px;
    width: 110px;
    text-align: center;
    .name {
      font-size: 14px;
      padding-top: 15px;
      color: #030303;
    }
  }
}
</style>
