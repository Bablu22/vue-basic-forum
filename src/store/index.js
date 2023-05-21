import { createStore } from "vuex";
import sourceData from "@/data.json";
import { findById, upsert } from "@/helpers";

export default createStore({
  state: {
    ...sourceData,
    authId: "jUjmgCurRRdzayqbRMO7aTG9X1G2",
  },
  getters: {
    authUser: (state, getters) => {
      return getters.user(state.authId);
    },
    user: (state) => {
      return () => {
        const user = findById(state.users, state.authId);
        if (!user) return null;
        return {
          ...user,
          get posts() {
            return state.posts.filter((post) => post.userId === user.id);
          },
          get threads() {
            return state.threads.filter((thread) => thread.userId === user.id);
          },
        };
      };
    },
    thread: (state) => {
      return (id) => {
        const thread = findById(state.threads, id);
        return {
          ...thread,
          get author() {
            return findById(state.users, thread.userId);
          },
          get repliesCount() {
            if (!thread.posts) return 0;
            return thread.posts.length - 1;
          },
          get contributorsCount() {
            if (!thread.contributors) return 0;
            return thread.contributors.length;
          },
        };
      };
    },
  },
  actions: {
    createPost(context, post) {
      post.id = "id" + Math.random();
      post.publishedAt = Math.floor(Date.now() / 1000);
      post.userId = context.state.authId;
      context.commit("setPost", { post });
      context.commit("appendPostToThread", {
        childId: post.id,
        parentId: post.threadId,
      });
      context.commit("appendContributorsToThread", {
        childId: context.state.authId,
        parentId: post.threadId,
      });
    },
    updateUser(context, user) {
      context.commit("setUser", { user, userId: user.id });
    },
    async createThread({ commit, state, dispatch }, { title, text, forumId }) {
      const id = "id" + Math.random();
      const publishedAt = Math.floor(Date.now() / 1000);
      const userId = state.authId;
      const thread = { forumId, title, publishedAt, userId, id };
      commit("setThread", { thread });
      commit("appendThreadToUser", { parentId: userId, childId: id });
      commit("appendThreadToForum", { parentId: forumId, childId: id });
      dispatch("createPost", { text, threadId: id });
      return findById(state.threads, id);
    },
    async updateThread({ commit, state }, { title, text, id }) {
      const thread = findById(state.threads, id);
      const post = findById(state.posts, thread.posts[0]);
      const newThread = { ...thread, title };
      const newPost = { ...post, text };
      commit("setThread", { thread: newThread });
      commit("setPost", { post: newPost });
      return newThread;
    },
  },
  mutations: {
    setPost(state, { post }) {
      upsert(state.posts, post);
    },
    setThread(state, { thread }) {
      upsert(state.threads, thread);
    },
    setUser(state, { user, userId }) {
      const userIndex = state.users.findIndex((user) => user.id === userId);
      state.users[userIndex] = user;
    },
    appendPostToThread: makeAppendChildToParentMutation({
      parent: "threads",
      child: "posts",
    }),

    appendThreadToForum: makeAppendChildToParentMutation({
      parent: "forums",
      child: "threads",
    }),
    appendThreadToUser: makeAppendChildToParentMutation({
      parent: "users",
      child: "threads",
    }),
    appendContributorsToThread: makeAppendChildToParentMutation({
      parent: "threads",
      child: "contributors",
    }),
  },
});

function makeAppendChildToParentMutation({ parent, child }) {
  return (state, { childId, parentId }) => {
    const resource = findById(state[parent], parentId);
    resource[child] = resource[child] || [];
    if (!resource[child].includes(childId)) {
      resource[child].push(childId);
    }
  };
}
