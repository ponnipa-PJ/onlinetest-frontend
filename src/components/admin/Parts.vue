<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="card card-info">
          <div class="card-header">
            <div class="d-flex align-items-center">
              <h3 class="mr-auto card-title">Parts</h3>
              <div class="btn-group" role="group">
                <button class="btn btn-success" @click="createdpart()">
                  Add
                </button>
              </div>
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body" v-if="currentParts">
            <div class="container-fluid">
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
                          <th>Part</th>
                          <th>Score</th>
                          <th>Status</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(part, index) in currentParts" :key="index">
                          <td>{{ part.name }}</td>
                          <td>{{ part.score }}</td>
                          <td v-if="part.status == 0">False</td>
                          <td v-if="part.status == 1">True</td>
                          <td style="text-align: center">
                            <router-link
                              :to="{
                                path: '/tests/' + subject_id + '/' + part.id,
                              }"
                              class="btn btn-primary btn-sm"
                            >
                              <i class="fas fa-play"> </i>
                              Select
                            </router-link>
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
          <!-- /.card-body -->
          <div v-else>
            <h5 style="text-align: center">No recorded</h5>
          </div>
        </div>
        <!-- /.card -->
      </div>
      <!-- /.col -->
    </div>
  </div>
</template>

<script>
import PartsDataService from "../../services/PartsDataService";

export default {
  name: "testpage",
  components: {},
  data() {
    return {
      currentParts: [],
    };
  },
  computed: {},
  methods: {
    getParts(id) {
      PartsDataService.getpartsbysubjectid(id)
        .then((response) => {
          this.currentParts = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async createdpart() {
      this.$swal
        .fire({
          title: "Add Part",
          html: `<input type="text" id="name" class="swal2-input" placeholder="Name">
  <input type="number" id="score" class="swal2-input" placeholder="Score">
  <select id="status" class="swal2-input">
          <option selected
           value="1">True
          </option>
          <option
           value="0">False
          </option>
        </select>`,
          showCancelButton: true,
          confirmButtonText: "Save",
          preConfirm: () => {
            const name = this.$swal.getPopup().querySelector("#name").value;
            const score = this.$swal.getPopup().querySelector("#score").value;
            const status = this.$swal.getPopup().querySelector("#status").value;
            if (!score || !name) {
              this.$swal.showValidationMessage(`Please enter score and name`);
            } else {
              var data = {
                score: score,
                name: name,
                status: status,
                subject_id: this.subject_id,
              };
              console.log(data);
              PartsDataService.create(data)
                .then(() => {
                  this.getParts(this.subject_id);
                  this.$swal.fire({
                    icon: "success",
                    title: "Save successfully",
                  });
                })
                .catch((e) => {
                  console.log(e);
                });
            }
            return { score: score, name: name };
          },
        })
        .then(() => {});
    },
  },
  mounted() {
    this.subject_id = this.$route.params.id;
    this.getParts(this.subject_id);
  },
};
</script>

<style>
</style>