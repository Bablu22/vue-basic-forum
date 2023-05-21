<template>
  <span :title="humanFriendlyData()">
    {{ diffForHuman() }}
  </span>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizeDate from "dayjs/plugin/localizedFormat";

dayjs.extend(relativeTime);
dayjs.extend(localizeDate);

export default {
  name: "AppDate",
  props: {
    timestamp: {
      type: Number,
      required: true,
    },
  },
  methods: {
    userById(userId) {
      return this.users.find((u) => u.id === userId);
    },
    diffForHuman() {
      return dayjs.unix(this.timestamp).fromNow();
    },
    humanFriendlyData() {
      return dayjs.unix(this.timestamp).format("llll");
    },
  },
};
</script>

<style></style>
