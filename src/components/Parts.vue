<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="card card-primary">
          <div class="card-header">
            <h3 class="card-title">Parts</h3>
          </div>
          <!-- /.card-header -->
          <div class="card-body">
            <div class="row" v-if="currentParts">
              <div class="col-sm-4 mb-3" 
              v-for="(part, index) in currentParts"
              :key="index">
              <a class="m-3 btn btn-sm btn-warning" :href="'/tests/' + part.id">
                <div
                  class="position-relative p-3 bg-gray"
                  style="height: 180px"
                >
                  {{part.name}} <br />
                  {{part.score}} scores <br />
                  {{part.date}} <br />
                  {{part.time}} <br />
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
import PartsDataService from "../services/PartsDataService";

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
  },
  mounted() {
    this.getParts(this.$route.params.id);
  },
};
</script>

<style>
</style>