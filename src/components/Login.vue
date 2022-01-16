<template>
  <div>
    <h4>Login</h4>
      <img
        class="mb-4"
        src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
        alt=""
        width="72"
        height="72"
      />
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Name</label>
      <input
        type="text"
        v-model="name"
        id="inputName"
        class="form-control"
        placeholder="Name"
        required
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        v-model="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
      />
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit" @click="go">
        Sign in
      </button>
  </div>
</template>

<script>
import LoginDataService from "../services/LoginDataService";

export default {
  name: "login",
  components: {},
  data() {
    return {
      name:'',
      password:''
    };
  },
  computed: {},
  methods: {
    go() {
      var data = {
        name:this.name,
        pass:this.password
      }
      console.log(data);
      // LoginDataService.login(this.name,this.password)
      LoginDataService.getlogin(data)
      .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
  },
};
</script>

<style>
</style>