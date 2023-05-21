<template>
  <div class="container">
    <h1>Welcome to Home</h1>
    <thread-list :threads="threads" />
  </div>
</template>

<script>
import sourceData from "@/data.json";
import ThreadList from "@/components/ThreadList.vue";

export default {
  components: { ThreadList },
  data() {
    return {
      threads: sourceData.threads,
    };
  },
};
</script>

<style></style>
