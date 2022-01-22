<template>
  <div>
    <!-- Default box -->
    <div class="card">
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
              :href="'/questionsstu/' + subject.subject_id"
            >
              <td>
                <a :href="'/questionsstu/' + subject.subject_id +'/'+ stu_id">
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
                  :to="{ path: '/questionsstu/' + stu_id +'/'+subject.subject_id}"
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

export default {
  name: "Home",
  components: {},
  data() {
    return {
      currentSubjects: [],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    getSubjects(id) {
      SubjectsDataService.getsubjectbystuid(id)
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
  },
  mounted() {    
    this.stu_id = this.$route.params.id;
    this.getSubjects(this.stu_id);
  },
};
</script>

<style>
</style>