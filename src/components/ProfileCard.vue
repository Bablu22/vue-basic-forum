<template>
  <div class="profile-card">
    <p class="text-center">
      <img :src="user.avatar" alt="" class="avatar-xlarge" />
    </p>

    <h1 class="title">{{ user.name }}</h1>

    <p class="text-lead">{{ user.username }}</p>

    <p class="text-justify">{{ user.bio || "No bio specified" }}</p>

    <span class="online">{{ user.username }} is online</span>

    <div class="stats">
      <span>{{ user.posts.length }} posts</span>
      <span>{{ user.threads.length }} threads</span>
    </div>

    <hr />

    <p v-if="user.website" class="text-large text-center">
      <i class="fa fa-globe"></i>
      <a :href="user.website">{{ user.website }}</a>
    </p>
    <p class="text-xsmall text-faded text-center">
      Member since june 2003, last visited 4 hours ago
    </p>

    <div class="text-center">
      <hr />
      <router-link :to="{ name: 'ProfileEdit' }" class="btn-green btn-small"
        >Edit Profile
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileCard",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
