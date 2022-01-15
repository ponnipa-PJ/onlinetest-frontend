<template>
  <div>
    <h4>TestPage</h4>
    <div v-if="currentQuestions">
      <div
        class="list-group-item"
        v-for="(question, index) in currentQuestions"
        :key="index"
      >
        <h1>{{ question.name }}</h1>
          <div v-for="detail in question.details" :key="detail.id">
            <label v-bind:for="detail.id">
              <input
                type="checkbox"
                v-model="detail.checked"
                v-bind:value="detail.id"
                v-bind:id="detail.id"
                @click="createTask(question.id, detail.id)"
              />
              <span> {{ detail.name }}</span>
            </label>
        </div>
      </div>
      <br />
      <button
        class="btn btn-primary pull-right"
        @click="submit(question, detail)"
      >
        Save
      </button>
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
    };
  },
  computed: {},
  methods: {
    getAnswer(id) {
      AnswersDataService.getquestionsandanswersadmin(id,1)
        .then((response) => {
          this.currentQuestions = response.data;
          console.log(response.data);
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
  },
  mounted() {
    this.getAnswer(this.$route.params.id);
  },
};
</script>

<style>
</style>