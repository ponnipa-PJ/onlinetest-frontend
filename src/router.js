import Vue from "vue";
import Router from "vue-router";
import Home from './components/Home.vue';

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/login",
      name: "login",
      component: () => import("./components/Login"),
    },
    {
      path: "/home",
      alias: "/home",
      name: "home",
      component: Home
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import("./components/Admin"),
    },
    {
      path: "/testpage",
      alias: "/testpage",
      name: "testpage",
      component: () => import("./components/TestPage")
    },
    {
      path: "/add",
      alias: "/add",
      name: "add",
      component: () => import("./components/AddQuestion")
    },
    {
      path: "/subjects",
      alias: "/subjects",
      name: "subjects",
      component: () => import("./components/Subjects")
    },
    {
      path: "/subject/:id",
      alias: "/subject",
      name: "subject",
      component: () => import("./components/Subject")
    },
    {
      path: "/parts/:id",
      alias: "/parts",
      name: "parts",
      component: () => import("./components/Parts")
    },
    {
      path: "/tests/:subject_id/:part_id",
      alias: "/tests",
      name: "tests",
      component: () => import("./components/Tests")
    },
  ]
});
