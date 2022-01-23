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
      path: "/testpage",
      alias: "/testpage",
      name: "testpage",
      component: () => import("./components/TestPage")
    },
    {
      path: "/add",
      alias: "/add",
      name: "add",
      component: () => import("./components/admin/AddQuestion")
    },
    {
      path: "/subjects",
      alias: "/subjects",
      name: "subjects",
      component: () => import("./components/admin/Subjects")
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
      component: () => import("./components/admin/Parts")
    },
    {
      path: "/tests/:subject_id/:part_id",
      alias: "/tests",
      name: "tests",
      component: () => import("./components/admin/Tests")
    },
    {
      path: "/subjectstu/:id",
      alias: "/subjectstu",
      name: "subjectstu",
      component: () => import("./components/admin/SubjectsStu")
    },
    {
      path: "/questionsstu/:stu_id/:subject_id",
      alias: "/questionsstu",
      name: "questionsstu",
      component: () => import("./components/admin/questionsstu")
    },
    {
      path: "/editques/:question_id/:subject_id/:part_id",
      alias: "/editques",
      name: "editques",
      component: () => import("./components/admin/EditQuestion.vue")
    },
  ]
});
