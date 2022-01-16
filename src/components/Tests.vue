<template>
  <div>
    <h3>รายวิชา {{ subjectcode }} {{ subjectname }}</h3>
    <h4>Part {{ partname }}</h4>
    <h4 style="text-align: right">{{ partscore }} คะแนน</h4>
    <!-- <button @click="createquestion()">Add</button> -->
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
import AnswersDataService from "../services/AnswersDataService";
import SubjectsDataService from "../services/SubjectsDataService";
import PartsDataService from "../services/PartsDataService";

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
    getAnswer(subject_id, part_id) {
      AnswersDataService.getquestionsandanswersadmin(subject_id, part_id)
        .then((response) => {
          this.currentQuestions = response.data;
          console.log(response.data);
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
          // console.log(this.partname, this.partscore);
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
    createquestion(){
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
            }
            else{
              var data ={score:score,name:name,status:status,subject_id:this.subject_id}
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
              })
            }
            return {score: score, name: name }
          },
        })
        .then(() => {

        })
    }
  },
  mounted() {
    this.subject_id = this.$route.params.subject_id;
    this.part_id = this.$route.params.part_id;
    this.getAnswer(this.subject_id, this.part_id);
    this.getSubject();
    this.getPart();
  },
};
</script>

<style>
</style>