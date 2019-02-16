<template>
  <div>
    <div
      v-bind:style="[isShowLoginForm==true?{'display': 'block'}:{'display': 'none'}]"
      class="outside-wrapper"
      @click="closeForm"
    ></div>
    <div>
      <div
        id="loginForm"
        class="login-form text-dark"
        v-bind:style="[isShowLoginForm==true?{'top': top}:{'top': '-80%'}]"
      >
        <div class="login-form-header d-flex mb-2 bg-light pb-3 align-items-center">
          <div class="flex-grow-1">
            <i class="fa fa-close pl-4 pt-2" @click="closeForm()"></i>
          </div>
          <a
            id="cardNavSingIn"
            class="btn bg-light p-2"
            :class="{'text-orange':isLogin}"
            @click="toggleLoginForm()"
          >ورود</a>
          <a
            id="cardNavSignUp"
            class="btn bg-light p-2"
            :class="{'text-orange':!isLogin}"
            @click="toggleLoginForm()"
          >ثبت نام</a>
        </div>
        <form
          id="signInForm"
          v-on:submit.prevent="login"
          @keydown="form.onKeydown($event)"
          method="post"
          class="p-2"
          :class="[isLogin ? 'd-block':'d-none']"
        >
          <div class="form-group w-75 m-auto mb-1">
            <input
              v-model="form.email"
              type="text"
              :class="{'is-invalid': form.errors.has('email')}"
              class="form-control"
              placeholder="نام کاربری"
              name="email"
              autofocus
            >
            <has-error :form="form" field="email"/>
          </div>
          <div class="form-group w-75 m-auto mb-1">
            <input
              v-model="form.password"
              type="password"
              :class="{'is-invalid': form.errors.has('password')}"
              class="form-control"
              placeholder="رمز عبور"
              name="password"
            >
            <has-error :form="form" field="password"/>
          </div>
          <div class="form -group w-75 m-auto mb-1">
            <span class="text-muted">رمز خود را فراموش کرده اید</span>
            <a href>کلید کنید</a>
          </div>
          <div class="form-group w-75 m-auto mb-1">
            <button :disabled="form.busy" type="submit" class="btn btn-info">
              ورود
              <i class="fa fa-sign-in ml-2" :class="{'fa-spinner fa-spin': form.busy}"></i>
            </button>
          </div>
        </form>
        <div id="signUpForm" class="d-none" :class="[!isLogin ? 'd-block':'d-none']">
          <form action v-on:submit.prevent="register">
            <div class="form-group w-75 m-auto mb-1">
              <input
                v-model="registerForm.fullName"
                type="text"
                :class="{'is-invalid':registerForm.errors.has('fullName')}"
                class="form-control"
                placeholder="نام کامل"
                name="fullName"
                autofocus
              >
              <has-error :form="registerForm" field="fullName"></has-error>
            </div>
            <div class="form-group w-75 m-auto mb-1">
              <input
                v-model="registerForm.email"
                type="email"
                :class="{'is-invalid':registerForm.errors.has('email')}"
                class="form-control"
                placeholder="ایمیل"
                name="email"
              >
              <has-error :form="registerForm" field="email"></has-error>
            </div>

            <div class="form-group w-75 m-auto mb-1">
              <input
                v-model="registerForm.password"
                type="password"
                :class="{'is-invalid':registerForm.errors.has('registerPassword')}"
                class="form-control"
                placeholder="رمز عبور"
                name="registerPassword"
                autocomplete="new-password"
              >
              <has-error :form="registerForm" field="registerPassword"></has-error>
            </div>
            <div class="form-group w-75 m-auto mb-1">
              <input
                v-model="registerForm.confirmPassword"
                type="password"
                :class="{'is-invalid':registerForm.errors.has('confirmPassword')}"
                class="form-control"
                placeholder="تکرار رمز عبور"
                name="confirmPassword"
                autocomplete="new-password"
              >
              <has-error :form="registerForm" field="confirmPassword"></has-error>
            </div>

            <div class="form-group w-75 m-auto mb-1">
              <button :disabled="form.busy" type="submit" class="btn btn-info">
                ثبت نام
                <i class="fa fa-user-plus ml-2" :class="{'fa-spinner fa-spin': rForm.busy}"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import Form from "vform";
import swal from "sweetalert2";
export default {
  name: "SignForm",
  props: {
    top: String,
    redirect: null,
    isShow: false
  },
  data() {
    return {
      email: "",
      password: "",
      step: 1,
      isUsernameValid: false,
      checkUniqueMessage: "",
      isLogin: true,
      message: "click to button",
      form: new Form({
        email: "",
        password: ""
      }),
      registerForm: new Form({
        fullName: "",
        email: "",
        confirmPassword: "",
        password: "",
        remember: false
      }),
      remember: false,
      rForm: new Form({
        full_name: "",
        email: "",
        password: "",
        remember: false
      })
    };
  },
  computed: {
    ...mapGetters({
      isShowLoginForm: "modals/isShowLoginForm"
    })
  },

  methods: {
    toggleLoginForm() {
      this.isLogin = !this.isLogin;
    },
    ...mapMutations({
      SHOW_SING_FORM: "modals/SHOW_SING_FORM"
    }),

    ...mapActions({
      AUTH_REQUEST: "AUTH_REQUEST" // map `this.add()` to `this.$store.dispatch('increment')`
    }),
    closeForm() {
      this.SHOW_SING_FORM();
    },
    async login() {
      if (!this.form.email) {
        this.form.errors.set("email", "لطفا ایمیل خود را وارد کنید");
        return;
      } else if (!this.validEmail(this.form.email)) {
        this.form.errors.set("email", "لطفا ایمیل خود را به درستی وارد کنید");
        return;
      }
      if (!this.form.password) {
        this.form.errors.set("password", "لطفا رمز عبور خود را وارد کنید");
        return;
      }
      await this.form
        .post("/login")
        .then(({ data }) => {
          if (data.status != 1) {
            swal.fire({
              type: "error",
              title: "خطا",
              text: data.message,
              focusConfirm: false,
              confirmButtonColor: "#d65611",
              confirmButtonText: "باشه"
            });
            return;
          }
          this.$store.dispatch("auth/saveToken", {
            token: data.data.token,
            remember: this.remember
          });
          this.$store.dispatch("auth/fetchUser");
          if (this.redirect != null) {
            this.$router.push({ path: this.redirect });
          } else {
            this.$router.push({ name: "home" });
          }
        })
        .catch(error => {
          swal.fire({
            type: "error",
            title: "خطا در ارتباط با سرور",
            text: "اینترنت خود را چک کنید",
            focusConfirm: false,
            confirmButtonColor: "#d65611",
            confirmButtonText: "باشه"
          });
        });
    },
    async register() {
      if (!this.registerForm.fullName) {
        this.registerForm.errors.set("fullName", "لطفا نام خود را وارد کنید");
        return;
      } else if (!this.registerForm.email) {
        this.registerForm.errors.clear("fullName");
        this.registerForm.errors.set("email", "لطفا ایمل خود را وارد کنید");
        return;
      } else if (!this.registerForm.password) {
        this.registerForm.errors.clear("email");
        this.registerForm.errors.set(
          "registerPassword",
          "لطفا رمز عبور خود را وارد کنید"
        );
        return;
      } else if (
        this.registerForm.password != this.registerForm.confirmPassword
      ) {
        this.registerForm.errors.clear("registerPassword");
        this.registerForm.errors.set(
          "confirmPassword",
          "رمز عبور وارد شده یکسان نمی باشد"
        );
        return;
      }
      // else if(this.checkUsername()==0){
      //     this.registerForm.errors.clear('registerPassword')
      //     this.registerForm.errors.set('userName',this.checkUniqueMessage)
      //     return
      // }

      this.rForm.full_name = this.registerForm.fullName;
      this.rForm.email = this.registerForm.email;
      this.rForm.password = this.registerForm.password;

      await this.rForm
        .post("/register")
        .then(({ data }) => {
          this.registerForm.errors.clear(undefined);
          if (data.status != 1) {
            swal({
              type: "error",
              title: data.message,
              text: "",
              focusConfirm: false,
              confirmButtonColor: "#d65611",
              confirmButtonText: "باشه"
            });
            return;
          }

          swal({
            type: "success",
            title: data.message,
            text: "برای ورود به حساب کاربری روی دکمه ورود کلید کنید",
            focusConfirm: false,
            confirmButtonColor: "#d65611",
            confirmButtonText: "ورود"
          }).then(result => {
            if (result.value) {
              this.$store.dispatch("auth/saveToken", {
                token: data.data.token,
                remember: this.remember
              });
              this.$store.dispatch("auth/fetchUser");
              if (this.redirect != null) {
                this.$router.push({ path: this.redirect });
              } else {
                this.$router.push({ name: "home" });
              }
            }
          });
        })
        .catch(error => {
          swal({
            type: "error",
            title: "خطا در ارتباط با سرور",
            text: "اینترنت خود را چک کنید",
            focusConfirm: false,
            confirmButtonColor: "#d65611",
            confirmButtonText: "باشه"
          });
        });
    },
    sendCode() {
      if (!this.registerForm.mobileNumber) {
        this.registerForm.errors.set(
          "mobileNumber",
          "شماره تلفن همراه خود را وارد کنید"
        );
        return;
      } else if (!this.validMobileNumber(this.registerForm.mobileNumber)) {
        this.registerForm.errors.set(
          "mobileNumber",
          "لطفا شماره موبایل 11 رقمی وارد کنید"
        );
        return;
      }

      //send verification code  {}

      this.step++;
      // $("#step-one-number").toggleClass("step-deactive");
      // $("#step-two-number").toggleClass("step-deactive");
    },
    checkCode() {
      if (!this.registerForm.code) {
        this.registerForm.errors.set(
          "registerCode",
          "کد ارسال شده را وارد کنید"
        );
        return;
      }

      //Check Verification Code {}

      // $("#step-two-number").toggleClass("step-deactive");
      // $("#step-three-number").toggleClass("step-deactive");
      this.step++;
    },
    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validMobileNumber: function(mobile) {
      var re = /^\d{4}\d{3}\d{4}$/;
      return re.test(mobile);
    },
    async checkUsername() {
      await axios
        .post("/user_name-status", { user_name: this.registerForm.userName })
        .then(response => {
          if (response.data.status == 0) {
            console.log(response.data.status);
            this.checkUniqueMessage = response.data.message;
            this.registerForm.errors.set("userName", response.data.message);
            console.log(response.data.message);
            this.isUsernameValid = false;
            return response.data.status;
          } else {
            this.registerForm.errors.clear("userName");
            console.log(response.data.status);
            this.isUsernameValid = true;
            return response.data.status;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.outside-wrapper {
  display: none;
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
}

.sing-wrapper {
  padding: 20px;
  position: fixed;
  top: 25%;
  right: 42%;
  height: 400px;
  width: 300px;
  background-color: rgb(244, 244, 244);
  border: 2px solid #2b2b2b;
}

.login-form-wrapper {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.body-overlay {
  position: absolute;

  height: calc(100% + 10px);
  width: 100%;

  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.login-form {
  margin: auto auto;
  position: fixed;
  top: -80%;
  left: 30%;
  width: 40%;
  background-color: rgb(255, 255, 255);
  transition: top 0.2s ease;
  border-radius: 3px;
  z-index: 101;
}

.form-active {
  top: 0px;
}

.fa-close:hover {
  cursor: pointer;
}

.form-group {
  margin-bottom: 1rem !important;
}

#loginForm .btn {
  display: flex;
  align-items: center;
}

#signInForm .btn {
  border: 1px solid #d65611;
  background-color: #d65611;
}

#signUpForm .btn {
  border: 1px solid #d65611;
  background-color: #d65611;
}

.text-orange {
  color: #d65611 !important;
}

.step-container {
  padding-right: 2em;
  padding-left: 2em;
}

.step-number {
  border-radius: 0.8em;
  -moz-border-radius: 0.8em;
  -webkit-border-radius: 0.8em;
  color: #ffffff;
  background-color: #d65611;
  display: inline-block;
  font-weight: bold;
  line-height: 1.6em;
  margin-right: 5px;
  text-align: center;
  width: 1.6em;
  font-style: normal;
  font-size: 0.8em;
  /*text-align: center;*/
}

.step-deactive {
  background-color: #8d8d8d;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
@media (max-width: 768px) {
  #loginForm {
    left: 20%;
    width: 60%;
  }
}

@media (max-width: 530px) {
  #loginForm {
    left: 10%;
    width: 80%;
  }
}

@media (max-width: 1200px) {
  .step-line {
    display: none;
  }
}
</style>