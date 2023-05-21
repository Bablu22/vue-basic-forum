<template>
  <div class="container">
    <h1>{{ category.name }}</h1>
    <forum-list
      :forums="getForumForCategory(category)"
      :title="category.name"
    />
  </div>
</template>

<script>
import ForumList from "@/components/ForumList.vue";

export default {
  name: "Category",
  components: { ForumList },
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  computed: {
    category() {
      return this.$store.state.categories.find((c) => c.id === this.id);
    },
  },
  methods: {
    getForumForCategory(category) {
      return this.$store.state.forums.filter(
        (forum) => forum.categoryId === category.id
      );
    },
  },
};
</script>

<style></style>
