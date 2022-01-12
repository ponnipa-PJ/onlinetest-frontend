import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
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
  ]
});