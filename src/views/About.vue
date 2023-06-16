<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <button @click="toPage('/user')">to user</button>
    </div>
    <div style="margin: 16px 0">
      <a href="http://localhost:5173">跳转h5页面</a>
    </div>
    <div>
      <a href="http://localhost:5173/#/normal-h5">跳转标注h5页面</a>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ViewHome extends Vue {
  toPage(path: string) {
    this.$router.push(path);
  }
}
</script>
