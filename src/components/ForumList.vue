<template>
  <div class="col-full">
    <div class="forum-list">
      <h2 class="list-title">
        <router-link
          v-if="categoryId"
          :to="{
            name: 'Category',
            params: {
              id: categoryId,
            },
          }"
          >{{ title }}
        </router-link>
        <span v-else>{{ title }}</span>
      </h2>
      <div class="forum-listing" v-for="forum in forums" :key="forum.id">
        <div class="forum-details">
          <router-link :to="{ name: 'Forum', params: { id: forum.id } }">
            {{ forum.name }}
          </router-link>
          <p>{{ forum.description }}.</p>
        </div>

        <div class="threads-count">
          <p>
            <span class="count">{{ forum.threads?.length }}</span>
            {{ forumThreadsWord(forum) }}
          </p>
        </div>

        <div class="last-thread">
          <img
            class="avatar"
            src="https://pbs.twimg.com/profile_images/719242842598699008/Nu43rQz1_400x400.jpg"
            alt=""
          />
          <div class="last-thread-details">
            <a href="thread.html">Post Reactions</a>
            <p class="text-xsmall">
              By <a href="profile.html">Rolf Haug</a>, a month ago
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    forums: {
      required: true,
      type: Array,
    },
    title: {
      type: String,
      default: "Forum",
    },
    categoryId: { required: false, type: String },
  },
  methods: {
    forumThreadsWord(forum) {
      if (forum.threads?.length) {
        return forum.threads.length > 1 ? "threads" : "thread";
      } else {
        return "No threads";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
