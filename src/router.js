import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/home",
      name: "home",
      component: () => import("./components/Home")
    },
    {
      path: "/testpage",
      alias: "/testpage",
      name: "testpage",
      component: () => import("./components/TestPage")
    },
    {
      path: "/helloworld",
      alias: "/helloworld",
      name: "helloworld",
      component: () => import("./components/HelloWorld")
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
      path: "/tests/:id",
      alias: "/tests",
      name: "tests",
      component: () => import("./components/Tests")
    },
  ]
});