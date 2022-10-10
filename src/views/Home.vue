<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import { deferFun } from "@/utils/util";
import { queryUserInfo, queryBookList } from "@/services/index";

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
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
    console.log(res, "================获取列表");
  }
}
</script>
