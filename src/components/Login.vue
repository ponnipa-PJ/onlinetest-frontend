<template>
  <div>
    <h4>Login</h4>
    <div class="card">
      <div class="card-body login-card-body">
        <p class="login-box-msg">Sign in to start your session</p>

          <div class="input-group mb-3">
            <input
              type="name"
              class="form-control"
              placeholder="Name"
              v-model="name"
            />
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-envelope"></span>
              </div>
            </div>
          </div>
          <div class="input-group mb-3">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              v-model="pass"
            />
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-lock"></span>
              </div>
            </div>
          </div>
          <div class="row">
            <!-- <div class="col-8">
            <div class="icheck-primary">
              <input type="checkbox" id="remember">
              <label for="remember">
                Remember Me
              </label>
            </div>
          </div> -->
            <!-- /.col -->
            <div class="col-12">
              <button
                type="submit"
                class="btn btn-primary btn-block"
                @click="handleLogin"
              >
                Sign In
              </button>
            </div>
            <!-- /.col -->
          </div>

        <!-- <div class="social-auth-links text-center mb-3">
        <p>- OR -</p>
        <a href="#" class="btn btn-block btn-primary">
          <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
        </a>
        <a href="#" class="btn btn-block btn-danger">
          <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
        </a>
      </div> -->
        <!-- /.social-auth-links -->
      </div>
      <!-- /.login-card-body -->
    </div>
  </div>
</template>

<script>
// import User from '../models/user';

export default {
  name: "login",
  components: {},
  data() {
    return {
      name: "",
      pass: "",
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      var data = {
        name: this.name,
        pass: this.pass,
      };
      if (this.name && this.pass) {
        this.$store.dispatch("auth/login", data).then(
          (res) => {
            console.log(res);
            this.$router.push("/home");
          },
          (error) => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            var Toast = this.$swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
            });
            Toast.fire({
              title: "Invalid name or password",
            });
          }
        );
      } else {
        var Toast = this.$swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
        Toast.fire({
          title: "Please enter name and password",
        });
      }
    },
  },
  mounted() {
  },
};
</script>

<style>
</style>