<template>
  <div>
    <h4>Add Question</h4>
    <div class="container">
      <div class="form-group">
        <label>Subject</label>
        <select @change="getParts" class="form-select mb-3">
          <option selected>Select</option>
          <option
            v-for="(subject, k) in subjects"
            v-bind:value="subject.id"
            :key="k"
          >
            {{ subject.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Part</label>
        <select
          class="form-select mb-3"
          @change="partid"
          aria-label="Default select example"
        >
          <option selected>Select</option>
          <option v-for="(part, k) in parts" v-bind:value="part.id" :key="k">
            {{ part.name }}
          </option>
        </select>
      </div>
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
</template>

<script>
import SubjectsDataService from "../../services/SubjectsDataService";
import PartsDataService from "../../services/PartsDataService";
import QuestionsDataService from "../../services/QuestionsDataService";
import AnswersDataService from "../../services/AnswersDataService";
import QuestionsAnswersDataService from "../../services/QuestionsAnswersDataService";

export default {
  name: "testpage",
  components: {},
  data() {
    return {
      currentQuestions: [],
      checkedNames: [],
      subjects: [],
      subject_id: 0,
      question_id:0,
      answer_id:0,
      part_id: 0,
      parts: [],
      question: "",
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
    getSubjects() {
      SubjectsDataService.getAll()
        .then((response) => {
          this.subjects = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getParts(event) {
      this.subject_id = event.target.value;
      PartsDataService.getpartsbysubjectid(this.subject_id)
        .then((response) => {
          this.parts = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    partid(event) {
      this.part_id = event.target.value;
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

    save() {
      console.log(this.subject_id);
      console.log(this.part_id);
      console.log(this.question);
      console.log(this.answers);
      // create question
      var questions = {
        name: this.question,
        part_id: this.part_id,
        subject_id: this.subject_id,
        description: '',
      };
      // console.log(questions);
      this.createdquestion(questions);
    },
    createdquestion(question) {
      QuestionsDataService.create(question)
        .then((response) => {
          console.log(response.data);
          this.question_id = response.data;
          
      // create answer
      for (let i = 0; i < this.answers.length; i++) {
        var answers = {
          question_id: this.question_id,
          name: this.answers[i].name,
        };
        console.log(answers);
        this.createdanswers(answers,this.answers[i]);
      }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    createdanswers(answers,data) {
      AnswersDataService.create(answers)
        .then((response) => {
          console.log(response.data);
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
          console.log(response.data);
          this.answer_id = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getSubjects();
  },
};
</script>

<style>
</style>