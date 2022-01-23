<template>
  <div>
    <h2>รายวิชา {{ code }} {{ subject }}</h2>
    <div v-if="currentQuestions">
      <div
        class="list-group-item"
        v-for="(part, index) in currentQuestions"
        :key="index"
      >
        <h3>Part {{ index + 1 }} {{ part.name }}</h3>
        <h4 style="text-align: right">จำนวน {{ part.score }} คะแนน</h4>
        <h4 style="text-align: right">  คะแนนที่ได้ {{ part.sumscore }} คะแนน</h4>
        <div
          class="list-group-item"
          v-for="(question, indexques) in part.questions"
          :key="indexques"
        >
          <h4 style="text-align: left">
            {{ indexques + 1 }}. {{ question.name }}
            <span style="float: right;color:red;"> {{ question.score }} คะแนน </span>
          </h4>
          <div v-for="detail in question.details" :key="detail.answer_id">
            <label v-bind:for="detail.answer_id">
              <input
                type="checkbox"
                disabled
                v-model="detail.checked"
                v-bind:value="detail.answer_id"
                v-bind:id="detail.answer_id"
              />
              <span> {{ detail.name }}</span>
            </label>
          </div>         
        </div>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import SubjectsDataService from "../../services/SubjectsDataService";
import AnswersDataService from "../../services/AnswersDataService";

export default {
  name: "testpage",
  components: {},
  data() {
    return {
      subject: "",
      code: "",
      currentQuestions: [],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    getSubject() {
      SubjectsDataService.getsubjectbyid(this.subject_id)
        .then((response) => {
          this.subject = response.data[0].name;
          this.code = response.data[0].code;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getQuestions() {
      AnswersDataService.getquestionsandanswers(this.subject_id, this.stu_id)
        .then((response) => {
          this.currentQuestions = response.data;
          // this.currentQuestions = this.currentQuestions.questions[Math.floor(Math.random() * this.currentQuestions.questions.length)];
          console.log(this.currentQuestions);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.subject_id = this.$route.params.subject_id;
    this.stu_id = this.$route.params.stu_id;
    this.getSubject();
    this.getQuestions();
  },
};
</script>

<style>
</style>