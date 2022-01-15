<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="card card-primary">
          <div class="card-header">
            <h3 class="card-title">Subjects</h3>
          </div>
          <!-- /.card-header -->
          <div class="card-body">
            <div class="row" v-if="currentSubjects">
              <div class="col-sm-4" 
              v-for="(subject, index) in currentSubjects"
              :key="index">
              <a class="m-3 btn btn-sm btn-warning" :href="'/parts/' + subject.id">
                <div
                  class="position-relative p-3 bg-gray"
                  style="height: 180px"
                >
                  <div class="ribbon-wrapper">
                    <div class="ribbon bg-primary">Ribbon</div>
                  </div>
                  {{subject.name}} <br />
                  <small>Part</small>
                </div>
              </a>
              </div>
            </div>
          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.card -->
      </div>
      <!-- /.col -->
    </div>
  </div>
</template>

<script>
import SubjectsDataService from "../services/SubjectsDataService";

export default {
  name: "testpage",
  components: {},
  data() {
    return {
      currentSubjects: [],
    };
  },
  computed: {},
  methods: {
    getSubjects() {
      SubjectsDataService.getAll()
        .then((response) => {
          this.currentSubjects = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getSubjects();
  },
};
</script>

<style>
</style>