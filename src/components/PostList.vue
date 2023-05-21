<template>
  <div v-for="post in posts" :key="post.id" class="post-list">
    <div class="post">
      <div class="user-info">
        <a href="#" class="user-name">{{ userById(post.userId).name }}</a
        ><a href="#">
          <img
            class="avatar-large"
            :src="userById(post.userId).avatar"
            alt=""
          />
        </a>
        <p class="desktop-only text-small">
          {{ userById(post.userId).posts.length || 0 }} posts
        </p>
        <p class="desktop-only text-small">
          {{ userById(post.userId).threads.length || 0 }} threads
        </p>
      </div>

      <div class="post-content">
        <div>
          <p>
            {{ post.text }}
          </p>
        </div>
        <a
          href="#"
          style="margin-left: auto"
          class="link-unstyled"
          title="Make a change"
          ><i class="fa fa-pencil"></i
        ></a>
      </div>
      <div class="post-date text-faded">
        <AppDate :timestamp="post.publishedAt" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostList",

  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      users: this.$store.state.users,
    };
  },
  methods: {
    userById(userId) {
      return this.$store.getters.user(userId);
    },
  },
};
</script>

<style></style>
