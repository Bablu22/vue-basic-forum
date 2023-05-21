import PageHome from "@/pages/Home.vue";
import TheThreadShow from "@/pages/ThreadShow.vue";
import { createRouter, createWebHistory } from "vue-router";
import NotFound from "@/pages/NotFound.vue";
import sourceData from "../data.json";
import Forum from "@/pages/Forum.vue";
import Category from "@/pages/Category.vue";
import Profile from "@/pages/Profile.vue";
import ThreadCreate from "@/pages/ThreadCreate.vue";
import ThreadEdit from "@/pages/ThreadEdit.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const routes = [
  { path: "/", name: "Home", component: PageHome },
  {
    path: "/me",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/me/edit",
    name: "ProfileEdit",
    component: Profile,
    props: { edit: true },
  },
  {
    path: "/forum/:id",
    name: "Forum",
    component: Forum,
    props: true,
  },
  {
    path: "/category/:id",
    name: "Category",
    component: Category,
    props: true,
  },
  {
    path: "/forum/:forumId/thread/create",
    name: "ThreadCreat",
    component: ThreadCreate,
    props: true,
  },
  {
    path: "/thread/:id/edit",
    name: "ThreadEdit",
    component: ThreadEdit,
    props: true,
  },
  {
    path: "/thread/:id",
    name: "ThreadShow",
    component: TheThreadShow,
    props: true,
    beforeEnter(to, from, next) {
      // check if threads exists
      const threads = sourceData.threads.find((t) => t.id === to.params.id);
      // if exists
      if (threads) {
        return next();
      } else {
        next({
          name: "NotFound",
          params: { pathMatch: to.path.substring(1).split("/") },
          query: to.query,
          hash: to.hash,
        });
      }
    },
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      const element = document.getElementById(to.hash.slice(1));
      if (element) {
        return window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }
    }
    return window.scrollTo({ top: 0, behavior: "smooth" });
  },
});
router.beforeEach((to, from, next) => {
  NProgress.start(); // Start the progress bar
  next();
});

router.afterEach(() => {
  NProgress.done(); // Complete the progress bar
});
