<template>
  <div class="container">
    <div class="flex-grid">
      <div class="col-3 push-top">
        <profile-card v-if="!edit" :user="user" />
        <profile-card-edit v-else :user="user" />
      </div>
      <div class="col-7 push-top">
        <div class="profile-header">
          <span class="text-lead"> Joker's recent activity </span>
          <a href="#">See only started threads?</a>
        </div>

        <hr />

        <div class="activity-list">
          <post-list :posts="user.posts" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PostList from "@/components/PostList.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import ProfileCardEdit from "@/components/ProfileCardEdit.vue";

export default {
  components: { ProfileCardEdit, ProfileCard, PostList },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({ user: "authUser" }),
  },
};
</script>

<style lang="scss" scoped></style>
