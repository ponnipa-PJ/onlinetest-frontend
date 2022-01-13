<template>
  <div>
    <h4>Add Test</h4>
    <div class="container">
      <select class="form-select mb-3" aria-label="Default select example">
        <option selected>Subject</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
      <select class="form-select mb-3" aria-label="Default select example">
        <option selected>Part</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
      <div class="input-group mb-3">
        <span class="input-group-text">Question</span>
        <input type="text" v-model="question" aria-label="question" class="form-control" />
      </div>
      <div v-for="(input, k) in checkbox" :key="k">
        <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <input type="checkbox"
                          value="input.check"
              v-model="input.check">
                        </span>
                      </div>
                      <input type="text" v-model="input.name" class="form-control">
                    </div>

        <div class="input-group mb-3">
          <div style="cursor: pointer">
            <i
              class="form-control bi bi-dash-circle"
              @click="remove(k)"
              v-show="k || (!k && checkbox.length > 1)"
            ></i>
          </div>
          <button
          type="button"
          style="cursor: pointer"
          class="btn btn-outline-secondary"
          @click="add(k)"
            v-show="k == checkbox.length - 1"
        >
          <i
            class="bi bi-plus-circle"            
          ></i>
        </button>
        </div>        
      </div>
      <button type="button" class="btn btn-success" @click="save()">Save</button>
    </div>
  </div>
</template>

<script>
import AnswersDataService from "../services/AnswersDataService";

export default {
  name: "testpage",
  components: {},
  data() {
    return {
      currentQuestions: [],
      checkedNames: [],
      question:'',
      checkbox: [
        {
          name: "",
          check: false,
        },
      ],
    };
  },
  computed: {},
  methods: {
    getAnswer() {
      AnswersDataService.getquestionsandanswers()
        .then((response) => {
          this.currentQuestions = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    add() {
      this.checkbox.push({
        name: "",
        party: "",
      });
      console.log(this.checkbox);
    },

    remove(index) {
      console.log(index);
      this.checkbox.splice(index, 1);
    },

    save() {
      console.log(this.checkbox);
      console.log(this.question);
    },
  },
  mounted() {
    this.getAnswer();
  },
};
</script>

<style>
</style>