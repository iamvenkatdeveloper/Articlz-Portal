<template>
  <v-dialog persistent max-width="450" v-model="LoginPageDialog" :fullscreen="$vuetify.breakpoint.name == 'sm' || $vuetify.breakpoint.name == 'xs'">
    <v-card class="elevation-0 pb-5" :color="$vuetify.theme.dark == true ? '#272727' : ''">
      <v-toolbar dense flat>
        <v-spacer />
        <v-btn icon @click="LoginPageDialogExit"><v-icon> mdi-close </v-icon></v-btn>
      </v-toolbar>
      <v-card-text align="center" justify="center" :class="$vuetify.breakpoint.name == 'sm' || $vuetify.breakpoint.name == 'xs' ? 'centerLogin' : ''">
        <v-row no-gutters>
          <v-col cols="12" md="12">
            <span class="display-1">{{ CurrentTitle }}</span>
          </v-col>
          <v-col cols="12" md="12">
            <v-window v-model="step">
              <!-- =================================== LOGIN ========================================== -->
              <v-window-item :value="1">
                <v-card-text class="mt-2">
                  <v-form ref="form" :lazy-validation="true">
                    <v-text-field
                      dense
                      outlined
                      label="Email ID *"
                      prepend-inner-icon="mdi-account"
                      :rules="[(v) => !!v || 'Email ID is required', (v) => /.+@.+/.test(v) || 'Email Must Be Valid']"
                      v-model="Login.EmailID"
                    ></v-text-field>
                    <v-text-field
                      dense
                      outlined
                      label="Password *"
                      :type="isPwd ? 'text' : 'password'"
                      @click:append="isPwd = !isPwd"
                      required
                      :append-icon="isPwd ? 'mdi-eye' : 'mdi-eye-off'"
                      prepend-inner-icon="mdi-lock"
                      :rules="[(v) => !!v || 'Password is required']"
                      v-model="Login.Password"
                      @keyup.enter="LoginValidationMethod()"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions class="mt-n7">
                  <v-checkbox dense class="my-0 py-0 ml-1" v-model="rememberMe">
                    <template v-slot:label>
                      <span :style="'font-size: 14px'">Remember Me</span>
                    </template>
                  </v-checkbox>
                  <v-spacer></v-spacer>
                  <v-btn small text class="mb-4 mr-2" color="primary" @click="step = 2">Forgot Password ?</v-btn>
                </v-card-actions>
                <v-card-actions class="pt-0 mt-n2 mx-2">
                  <v-btn block :loading="loading" tile color="primary" @click="LoginValidationMethod()">Login</v-btn>
                </v-card-actions>
                <v-btn text small class="text-none mt-3" color="primary" @click="step = 3">Don't have an account? Sign Up with Articalz</v-btn>
              </v-window-item>
              <!-- ===================================== FORGOT PASSWORD =========================================== -->
              <v-window-item :value="2">
                <v-card-text>
                  <v-form ref="formForgotPassword">
                    <div class="text-center">Please Enter The Registered Email</div>
                    <v-text-field
                      dense
                      outlined
                      label="Email"
                      v-model="ForgotEmail"
                      :rules="[(v) => !!v || 'Email ID is required', (v) => /.+@.+/.test(v) || 'Email Must Be Valid']"
                      class="mt-4"
                    >
                    </v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn text color="primary fontStyle" small @click="step = 1">Back To Sign In</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary fontStyle" small @click="ForgotPasswordMethod()">Submit</v-btn>
                </v-card-actions>
              </v-window-item>
              <!-- ====================================== SIGN UP ===================================== -->
              <v-window-item :value="3">
                <v-card-text class="text-left">
                  <v-form ref="formSignUp">
                    <v-text-field
                      outlined
                      dense
                      label="Email ID *"
                      class="mt-2"
                      prepend-inner-icon="mdi-account"
                      v-model="signupEmailID"
                      :rules="[(v) => !!v || 'Required', (v) => /.+@.+/.test(v) || 'Email Must Be Valid']"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions class="pt-0 mx-2 mt-n4">
                  <v-btn tile small block color="primary" @click="SignUpMethod()" :loading="loading">Sign Up</v-btn>
                </v-card-actions>
                <v-btn text small class="text-none mt-2" color="primary" @click="step = 1">back to Login</v-btn>
              </v-window-item>
            </v-window>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <Snackbar v-if="mounted" :SnackBarComponent="SnackBarComponent" />
  </v-dialog>
</template>

<script>
import Snackbar from "@/components/Extras/Snackbar.vue";

export default {
  props: {
    LoginPageDialog: Boolean,
  },
  components: {
    Snackbar,
  },
  data: () => ({
    CurrentTitle: "Login",
    step: 1,
    mounted: false,
    Login: {
      EmailID: "",
      Password: "",
    },
    ForgotEmail: "",
    signupEmailID: "",
    isPwd: false,
    rememberMe: false,
    loading: false,
    SnackBarComponent: {},
  }),
  watch: {
    step(val) {
      if (val == 1) this.CurrentTitle = "Login";
      else if (val == 2) {
        this.CurrentTitle = "Forgot Password";
        this.ForgotEmail = "";
        this.$refs.formForgotPassword.reset();
      } else if (val == 3) {
        this.CurrentTitle = "SignUp";
        this.signupEmailID = "";
        this.$refs.formSignUp.reset();
      }
    },
    LoginPageDialog(val) {
      if (val == true) {
        this.mounted = false;
        this.step = 1;
        this.SnackBarComponent = {};
        setTimeout(() => {
          this.mounted = true;
        }, 1000);
      }
    },
    rememberMe(val) {
      if (val == true) {
        localStorage.setItem("currentuseremail", JSON.stringify(this.Login));
      } else if (val == false) {
        delete localStorage.currentuseremail;
      }
    },
  },
  methods: {
    LoginValidationMethod() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        // Hard code the data
        if (this.Login.EmailID.toLowerCase().trim() === "admin@articlz.com") {
          this.$store.commit("SET_CURRENT_USER_DETAILS", {
            user_email_id: this.Login.EmailID,
            user_type: "PUBLISHER",
          });
        } else {
          this.$store.commit("SET_CURRENT_USER_DETAILS", {
            user_email_id: this.Login.EmailID,
            user_type: "READER",
          });
        }
        setTimeout(() => {
          this.loading = false;
          this.$router.push("/LandingPage");
        }, 1000);
      } else {
        this.SnackBarComponent = {
          SnackbarVmodel: true,
          SnackbarColor: "red",
          Top: true,
          SnackbarText: "Please fill in required fields!",
        };
      }
    },
    ForgotPasswordMethod() {
      if (this.$refs.formForgotPassword.validate()) {
        this.loading = true;
        setTimeout(() => {
          this.SnackBarComponent = {
            SnackbarVmodel: true,
            SnackbarColor: "green",
            Top: true,
            SnackbarText: "Reset Password link sent successfully!",
          };
          this.loading = false;
          this.step = 1;
        }, 500);
      } else {
        this.SnackBarComponent = {
          SnackbarVmodel: true,
          SnackbarColor: "red",
          Top: true,
          SnackbarText: "Please fill in required fields!",
        };
      }
    },
    LoginPageDialogExit() {
      this.mounted = false;
      this.$refs.form.reset();
      this.$emit("close");
    },
    SignUpMethod() {
      if (this.$refs.formSignUp.validate()) {
        this.loading = true;
        setTimeout(() => {
          this.SnackBarComponent = {
            SnackbarVmodel: true,
            SnackbarColor: "green",
            Top: true,
            SnackbarText: "Signup Invitation sent successfully! Please check your inbox!",
          };
          this.loading = false;
          this.step = 1;
        }, 500);
      } else {
        this.SnackBarComponent = {
          SnackbarVmodel: true,
          SnackbarColor: "red",
          Top: true,
          SnackbarText: "Please fill in required fields!",
        };
      }
    },
  },
};
</script>

<style>
.centerLogin {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
