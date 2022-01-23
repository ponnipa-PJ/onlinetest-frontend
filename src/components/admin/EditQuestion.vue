<template>
  <div>
    <h3>รายวิชา {{ subjectcode }} {{ subjectname }}</h3>
    <h4>Part {{ partname }}</h4>

    <div v-if="currentQuestions">
      <div>
        <div class="list-group-item md-5 form-group">
          <div class="form-group">
            <label>Question</label>
            <input
              type="text"
              v-model="question"
              aria-label="question"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label>Answer</label>
            <div v-for="(input, k) in answers" :key="k">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <input
                      type="checkbox"
                      value="input.check"
                      v-model="input.checked"
                    />
                  </span>
                </div>
                <input type="text" v-model="input.name" class="form-control" />
                <i
                  style="cursor: pointer; text-align: center"
                  class="form-control bi bi-dash-circle col-1"
                  @click="remove(k)"
                  v-show="k || (!k && answers.length > 1)"
                ></i>
              </div>
              <div class="input-group mb-3">
                <button
                  type="button"
                  style="cursor: pointer"
                  class="btn btn-secondary"
                  @click="add(k)"
                  v-show="k == answers.length - 1"
                >
                  <i class="bi bi-plus-circle"></i>
                  Add Answer
                </button>
              </div>
            </div>
          </div>
        </div>
        <button type="button" class="btn btn-success" @click="save()">
          Save
        </button>
      </div>
      <br />
      <!-- <button
        class="btn btn-primary pull-right"
        @click="submit(question, detail)"
      >
        Save
      </button> -->
    </div>
  </div>
</template>

<script>
import AnswersDataService from "../../services/AnswersDataService";
import SubjectsDataService from "../../services/SubjectsDataService";
import PartsDataService from "../../services/PartsDataService";
import QuestionsDataService from "../../services/QuestionsDataService";
import QuestionsAnswersDataService from "../../services/QuestionsAnswersDataService";

export default {
  name: "testpage",
  components: {},
  data() {
    return {
      currentQuestions: [],
      subjectname: "",
      subjectcode: "",
      partname: "",
      partscore: "",
      question: "",
      answers: [],
    };
  },
  computed: {},
  methods: {
    getAnswer() {
      QuestionsDataService.getquestionandanswer(this.question_id)
        .then((response) => {
          this.currentQuestions = response.data;
          console.log(response.data);
          for (let i = 0; i < this.currentQuestions.length; i++) {
            this.question = this.currentQuestions[i].name;
            for (let a = 0; a < this.currentQuestions[i].details.length; a++) {
              this.answers.push({
                id: this.currentQuestions[i].details[a].answer_id,
                name: this.currentQuestions[i].details[a].name,
                checked: this.currentQuestions[i].details[a].checked,
              });
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getSubject() {
      SubjectsDataService.getsubjectbyid(this.subject_id).then((response) => {
        // console.log(response.data);
        this.subjectcode = response.data[0].code;
        this.subjectname = response.data[0].name;
        // console.log(this.subjectcode,this.subjectname);
      });
    },
    getPart() {
      PartsDataService.getpartsbyid(this.subject_id, this.part_id).then(
        (response) => {
          // console.log(response.data);
          this.partname = response.data[0].name;
          this.partscore = response.data[0].score;
        }
      );
    },
    createTask(questionid, answerid) {
      console.log(questionid, answerid);
    },
    submit(questionid, answerid) {
      console.log(questionid, answerid);
    },
    add() {
      this.answers.push({
        name: "",
        checked: false,
      });
      console.log(this.answers);
    },

    remove(index) {
      console.log(index);
      this.answers.splice(index, 1);
    },
    async save() {
      // console.log(this.question);
      // console.log(this.answers);
      // create question
      var questions = {
        id: this.question_id,
        name: this.question,
        description: "",
      };
      //   console.log(questions);
      this.updatedquestion(questions);
    },
    updatedquestion(question) {
      QuestionsDataService.update(question)
        .then(() => {
          //   console.log(response.data);

          // delete QuestionsAnswers
          QuestionsAnswersDataService.delete(this.question_id);

          // create answer
          for (let i = 0; i < this.answers.length; i++) {
            if (this.answers[i].name) {
              if (this.answers[i].id) {
                var answerlist = {
                  id: this.answers[i].id,
                  name: this.answers[i].name,
                };
                console.log(answerlist);
                this.updateanswers(answerlist, this.answers[i]);
              } else {
                var newanswerlist = {
                  question_id: this.question_id,
                  name: this.answers[i].name,
                };
                console.log(newanswerlist);
                this.createdanswers(newanswerlist, this.answers[i]);
              }
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    createdanswers(answers, data) {
      AnswersDataService.create(answers)
        .then((response) => {
          // console.log(response.data);
          this.answer_id = response.data;
          if (data.checked == true) {
            var questionanswer = {
              question_id: this.question_id,
              answer_id: this.answer_id,
            };
            console.log(questionanswer);
            this.createdquestionanswer(questionanswer);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateanswers(answers, data) {
      AnswersDataService.update(answers)
        .then(() => {
          // console.log(response.data);
          this.answer_id = data.id;
          if (data.checked == true) {
            var questionanswer = {
              question_id: this.question_id,
              answer_id: this.answer_id,
            };
            console.log(questionanswer);
            this.createdquestionanswer(questionanswer);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    createdquestionanswer(questionanswer) {
      QuestionsAnswersDataService.create(questionanswer)
        .then((response) => {
          // console.log(response.data);
          if (response.data == true) {
            this.$swal.fire({
              icon: "success",
              title: "Save successfully",
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.question_id = this.$route.params.question_id;
    this.subject_id = this.$route.params.subject_id;
    this.part_id = this.$route.params.part_id;
    this.getAnswer();
    this.getSubject();
    this.getPart();
  },
};
</script>

<style>
</style>