<template>
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea
          v-model="text"
          name=""
          id=""
          cols="30"
          rows="10"
          class="form-input"
        />
      </div>
      <div class="form-action"></div>
      <button class="btn-blue">Submit Post</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "PostEditor",
  data() {
    return {
      text: "",
    };
  },
  methods: {
    save() {
      const post = {
        text: this.text,
      };
      this.$emit("save", { post });
      this.text = "";
    },
  },
};
</script>

<style></style>
