<template>
  <div class="container">
    <h1>Welcome to Home</h1>
    <category-list :categories="categories" />
  </div>
</template>

<script>
import CategoryList from "@/components/CategoryList.vue";

export default {
  components: { CategoryList },

  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
};
</script>

<style></style>
