<template>
  <div>
    <h4>Add Test</h4>
    <div class="container">
      <div class="form-group" v-for="(input, k) in inputs" :key="k">
        <input
          type="text"
          class="form-control"
          v-model="input.name"
          placeholder="Question"
        />
        <input
          type="text"
          class="form-control"
          v-model="input.party"
          placeholder="Description"
        />        
              <br />
      <input type="checkbox" id="" value="" v-model="checkedNames" />
      <label for=""><input type="text" class="form-control" /></label><br />
      <input type="checkbox" id="" value="" v-model="checkedNames" />
      <label for=""><input type="text" class="form-control" /></label><br />
      <input type="checkbox" id="" value="" v-model="checkedNames" />
      <label for=""><input type="text" class="form-control" /></label>
      <br />
      <!-- <span>Checked names: {{ checkedNames }}</span -->

      <span>
          <i
            class="fas fa-minus-circle"
            @click="remove(k)"
            v-show="k || (!k && inputs.length > 1)"
            >Remove</i
          >
          <i
            class="fas fa-plus-circle"
            @click="add(k)"
            v-show="k == inputs.length - 1"
            >Add fields</i
          >
        </span>
      </div>
      <button @click="addQuestion">Submit</button>
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
      inputs: [
        {
          name: "",
          party: "",
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
      this.inputs.push({
        name: "",
        party: "",
      });
      console.log(this.inputs);
    },

    remove(index) {
      this.inputs.splice(index, 1);
    },

    addQuestion() {
      console.log(this.inputs);
    },
  },
  mounted() {
    this.getAnswer();
  },
};
</script>

<style>
</style>