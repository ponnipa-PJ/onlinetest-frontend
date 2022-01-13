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
              v-for="(subject, index) in currentParts"
              :key="index">
                <div
                  class="position-relative p-3 bg-gray"
                  style="height: 180px"
                >
                  {{subject.name}} <br />
                  {{subject.score}} scores <br />
                  {{subject.date}} <br />
                  {{subject.time}} <br />
                </div>
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
  selected: "1",
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