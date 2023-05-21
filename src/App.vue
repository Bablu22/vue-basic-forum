<template>
  <the-navbar />
  <router-view />
</template>

<script>
import TheNavbar from "@/components/TheNavbar.vue";

export default {
  name: "App",
  components: { TheNavbar },
  data() {
    return {
      msg: "",
    };
  },
};
</script>

<style>
@import "assets/style.css";
</style>
