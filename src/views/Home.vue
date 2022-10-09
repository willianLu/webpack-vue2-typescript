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
  }
}
</script>
