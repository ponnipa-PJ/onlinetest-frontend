<template>
  <div>
    <h3>รายวิชา {{ subjectcode }} {{ subjectname }}</h3>
    <h4>Part {{ partname }}</h4>
    <h4 style="text-align: right">{{ partscore }} คะแนน</h4>
    <button class="btn btn-primary btn-sm mb-3" @click="clickshowform()">
      {{ textshow }}
    </button>

    <div class="card mt-3" v-if="showform">
      <div class="list-group-item">
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
        <button type="button" class="btn btn-success" @click="save()">
          Save
        </button>
      </div>
    </div>

    <div v-if="currentQuestions">
      <div
        class="list-group-item"
        v-for="(question, index) in currentQuestions"
        :key="index"
      >
        <h1 style="text-align: left">
          {{ question.name }}

          <router-link :to="{ path: '/editques/' + question.question_id+'/'+subject_id+'/'+part_id }">
            <span style="float: right">
              <button class="btn btn-warning btn-sm">
                <i class="fas fa-pen"> </i>
              </button>
            </span>
          </router-link>
        </h1>
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
      showform: false,
      textshow: "Add",
      answers: [
        {
          name: "",
          checked: false,
        },
      ],
    };
  },
  computed: {},
  methods: {
    getAnswer() {
      AnswersDataService.getquestionsandanswersadmin(
        this.subject_id,
        this.part_id
      )
        .then((response) => {
          this.currentQuestions = response.data;
          // console.log(response.data);
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
    createquestion() {
      this.$swal
        .fire({
          title: "Add Question",
          html: `<input type="text" id="question" class="swal2-input" placeholder="Question">
          <input type='checkbox' name='vehicle' value='Bike'>
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
        </div>`,
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
    clickshowform() {
      if (this.showform == true) {
        this.textshow = "Add";
        this.showform = false;
      } else if (this.showform == false) {
        this.textshow = "Close";
        this.showform = true;
      }
    },
    async save() {
      // console.log(this.question);
      // console.log(this.answers);
      // create question
      var questions = {
        name: this.question,
        part_id: this.part_id,
        subject_id: this.subject_id,
        description: "",
      };
      console.log(questions);
      await this.createdquestion(questions);
    },
    createdquestion(question) {
      QuestionsDataService.create(question)
        .then((response) => {
          // console.log(response.data);
          this.question_id = response.data;

          // create answer
          for (let i = 0; i < this.answers.length; i++) {
            var answerlist = {
              question_id: this.question_id,
              name: this.answers[i].name,
            };
            console.log(answerlist);
            this.createdanswers(answerlist, this.answers[i]);
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
    createdquestionanswer(questionanswer) {
      QuestionsAnswersDataService.create(questionanswer)
        .then((response) => {
          // console.log(response.data);
          if (response.data == true) {
            this.$swal.fire({
              icon: "success",
              title: "Save successfully",
            });
            this.getAnswer();
            this.getSubject();
            (this.question = ""),
              (this.answers = [
                {
                  name: "",
                  checked: false,
                },
              ]),
              this.clickshowform();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
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