<template>
  <div>
    <h4>Home</h4>
    <h3 v-if="currentUser[0]">{{currentUser[0].name}}</h3>
    <!-- Default box -->
    <div class="card" v-if="currentUser[0].role ==1">
      <div class="card-header">
        <h3 class="card-title">Subjects List</h3>

        <div class="card-tools">
          <!-- <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
              <i class="fas fa-minus"></i>
            </button>
            <button type="button" class="btn btn-tool" data-card-widget="remove" title="Remove">
              <i class="fas fa-times"></i>
            </button> -->
        </div>
      </div>
      <div class="card-body p-0" v-if="currentSubjects">
        <table class="table table-striped projects">
          <thead>
            <tr>
              <th style="width: 30%">วิชา</th>
              <th style="width: 20%">ผู้สอน</th>
              <th style="width: 20%"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(subject, index) in currentSubjects"
              :key="index"
              :href="'/subject/' + subject.subject_id"
            >
              <td>
                <a :href="'/subject/' + subject.subject_id">
                  {{ subject.subject_name }}
                </a>
                <br />
              </td>
              <td>
                <ul class="list-inline">
                  <li class="list-inline-item">
                    <img
                      alt="Avatar"
                      class="table-avatar"
                      src="../dist/img/avatar3.png"
                    />
                  </li>
                </ul>
              </td>
              <td class="project-actions text-right">
                <router-link
                  :to="{ path: '/subject/' + subject.subject_id }"
                  class="btn btn-primary btn-sm"
                >
                  <i class="fas fa-play"> </i>
                  Start</router-link
                >
                <!-- <a class="btn btn-info btn-sm" href="#">
                              <i class="fas fa-pencil-alt">
                              </i>
                              Edit
                          </a>
                          <a class="btn btn-danger btn-sm" href="#">
                              <i class="fas fa-trash">
                              </i>
                              Delete
                          </a> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- /.card-body -->
    </div>
        <div class="card" v-if="currentUser[0].role ==2">
      <div class="card-header">
        <h3 class="card-title">User List</h3>

        <div class="card-tools">
          <!-- <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
              <i class="fas fa-minus"></i>
            </button>
            <button type="button" class="btn btn-tool" data-card-widget="remove" title="Remove">
              <i class="fas fa-times"></i>
            </button> -->
        </div>
      </div>
      <div class="card-body p-0" v-if="currentUsers">
        <table class="table table-striped projects">
          <thead>
            <tr>
              <th style="width: 30%">รหัสนิสิต</th>
              <th style="width: 20%"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, index) in currentUsers"
              :key="index"
              :href="'/subject/' + user.id"
            >
              <td>
                <a :href="'/subject/' + user.id">
                  {{ user.name }}
                </a>
                <br />
              </td>
              <td class="project-actions text-right">
                <router-link
                  :to="{ path: '/subject/' + user.id }"
                  class="btn btn-primary btn-sm"
                >
                  <i class="fas fa-eye"> </i>
                  View</router-link
                >
                <!-- <a class="btn btn-info btn-sm" href="#">
                              <i class="fas fa-pencil-alt">
                              </i>
                              Edit
                          </a>
                          <a class="btn btn-danger btn-sm" href="#">
                              <i class="fas fa-trash">
                              </i>
                              Delete
                          </a> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- /.card-body -->
    </div>
    <!-- /.card -->
  </div>
</template>

<script>
import SubjectsDataService from "../services/SubjectsDataService";
import UsersDataService from "../services/UserDataService.js";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      currentSubjects: [],
      currentUsers:[]
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    getSubjects() {
      SubjectsDataService.getsubjectbystuid(this.currentUser[0].id)
        .then((response) => {
          this.currentSubjects = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    createTask(questionid, answerid) {
      console.log(questionid, answerid);
    },
    submit(questionid, answerid) {
      console.log(questionid, answerid);
    },
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    getUsers() {
      UsersDataService.getUsers()
        .then((response) => {
          this.currentUsers = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getSubjects();
    this.getUsers();
    // localStorage.removeItem('user');
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    console.log(this.$store.state.auth.user);
  },
};
</script>

<style>
</style>