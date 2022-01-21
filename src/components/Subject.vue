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
        <div
          class="list-group-item"
          v-for="question in part.questions"
          :key="question.id"
        >
          <h4>{{ question.name }}</h4>
          <div v-for="detail in question.details" :key="detail.answer_id">
            <label v-bind:for="detail.answer_id">
              <input
                type="checkbox"
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
      <button class="btn btn-primary pull-right" @click="submit()">Save</button>
    </div>
  </div>
</template>

<script>
import SubjectsDataService from "../services/SubjectsDataService";
import AnswersDataService from "../services/AnswersDataService";
import StuAnswersDataService from "../services/StuAnswersDataService";

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
    getSubject(subject_id) {
      SubjectsDataService.getsubjectbyid(subject_id)
        .then((response) => {
          this.subject = response.data[0].name;
          this.code = response.data[0].code;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getQuestions(subject_id) {
      AnswersDataService.getquestionsandanswers(subject_id, this.currentUser[0].id)
        .then((response) => {
          this.currentQuestions = response.data;
          // this.currentQuestions = this.currentQuestions.questions[Math.floor(Math.random() * this.currentQuestions.questions.length)];
          console.log(this.currentQuestions);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async submit() {
      for (let p = 0; p < this.currentQuestions.length; p++) {
        // console.log(this.currentQuestions[p]);
        for (let i = 0; i < this.currentQuestions[p].questions.length; i++) {
          // console.log(this.currentQuestions[p].questions[i].question_id);
          await StuAnswersDataService.delete(
            this.currentQuestions[p].questions[i].question_id
          ,this.currentUser[0].id);
          for (
            let d = 0;
            d < this.currentQuestions[p].questions[i].details.length;
            d++
          ) {
          //   // console.log(this.currentQuestions[p].questions[i].details[d]);
            if (
              this.currentQuestions[p].questions[i].details[d].checked === true
            ) {
              var data = {
                stu_id: this.currentUser[0].id,
                question_id:
                  this.currentQuestions[p].questions[i].details[d].question_id,
                answer_id:
                  this.currentQuestions[p].questions[i].details[d].answer_id,
              };
              await StuAnswersDataService.create(data);
            }
          }
          this.alertSaveSuccess();
        }
      }
    },
    created(data) {
      StuAnswersDataService.create(data);
      this.alertSaveSuccess();
      //     .then((response) => {
      //       console.log(response.data);
      //     })
      //     .catch((e) => {
      //       console.log(e);
      //     });
    },
    alertSaveSuccess() {
      var Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
      Toast.fire({
        title: "บันทึกสำเร็จ",
      });
    },
  },
  mounted() {
    this.subject_id = this.$route.params.id;
    this.getSubject(this.subject_id);
    this.getQuestions(this.subject_id);
  },
};
</script>

<style>
</style>