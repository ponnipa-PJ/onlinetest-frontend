<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="card card-primary">
          <div class="card-header">
            <div class="d-flex align-items-center">
              <h3 class="mr-auto card-title">Subjects</h3>
              <div class="btn-group" role="group">
                <button class="btn btn-success" @click="createdsubject()">
                  Add
                </button>
              </div>
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body">
            <div class="container-fluid" v-if="currentSubjects">
              <div class="row">
                <div class="col-12">
                  <div class="card">
                    <!-- /.card-header -->
                    <table
                      id="example2"
                      class="table table-bordered table-hover"
                    >
                      <thead>
                        <tr>
                          <th>Code</th>
                          <th>Subject</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(subject, index) in currentSubjects"
                          :key="index"
                          :href="'/parts/' + subject.id"
                        >
                          <td>{{ subject.code }}</td>
                          <td>{{ subject.name }}</td>
                          <td style="text-align: center">
                            <a
                              class="btn btn-primary btn-sm"
                              :href="'/parts/' + subject.id"
                            >
                              <i class="fas fa-play"> </i>
                              Select
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!-- /.card-body -->
                </div>
              </div>
              <!-- /.col -->
            </div>
            <!-- /.row -->
          </div>
        </div>
        <!-- /.card-body -->
      </div>
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
    async createdsubject() {
      this.$swal
        .fire({
          title: "Add Subject",
          html: `<input type="number" id="code" class="swal2-input" placeholder="Code">
  <input type="text" id="name" class="swal2-input" placeholder="Name">`,
          showCancelButton: true,
          confirmButtonText: "Save",
          preConfirm: () => {
            const code = this.$swal.getPopup().querySelector("#code").value;
            const name = this.$swal.getPopup().querySelector("#name").value;
            if (!code || !name) {
              this.$swal.showValidationMessage(`Please enter code and name`);
            }
            else{
              var data ={code:code,name:name}
               SubjectsDataService.create(data)
              .then(() => {
                this.getSubjects();
                this.$swal.fire({
                  icon: "success",
                  title: "Save successfully",
                });
              })
              .catch((e) => {
                console.log(e);
              })
            }
            return {code: code, name: name }
          },
        })
        .then(() => {

        })
    },
  },
  mounted() {
    this.getSubjects();
  },
};
</script>

<style>
</style>