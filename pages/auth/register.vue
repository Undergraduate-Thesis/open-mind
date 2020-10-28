<template>
  <div class="register">
    <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
    <div
      class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-md w-full">
        <div>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            class="mx-auto h-12 w-auto text-blue-600"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <h2
            class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900"
          >
            Join with us!
          </h2>
        </div>
        <div class="w-full max-w-xl mt-8 bg-white rounded-lg shadow-md">
          <div
            v-show="errorMessage != null"
            class="mb-2 bg-red-200 border-l-4 border-red-500 text-red-900 p-4"
            role="alert"
          >
            <p class="font-bold mb-1">{{ errorMessage }}</p>
            <div class="flex">
              <p class="flex-auto">
                Are you already have an account?
              </p>
              <nuxt-link
                to="/auth/login"
                aria-label="Sigin"
                class="flex-auto py-1 border border-transparent text-sm leading-5 font-medium rounded-md bg-indigo-600 hover:bg-indigo-500 text-white"
                tag="button"
                >Sigin</nuxt-link
              >
            </div>
          </div>
          <form class="p-6" action="#" method="POST" @submit.prevent="signup()">
            <input type="hidden" name="remember" value="true" />
            <div class="rounded-md shadow-sm">
              <div class="mb-6">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="name"
                  >name</label
                >
                <input
                  name="name"
                  type="text"
                  aria-label="name"
                  aria-invalid="true"
                  aria-describedby="errorMessage"
                  aria-required="true"
                  required
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  placeholder="Name"
                  v-model="name"
                />
              </div>
              <div class="mb-6">
                <label
                  class="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="gender"
                  >Gender</label
                >
                <div class="relative">
                  <select
                    v-model="gender"
                    class="block appearance-none w-full border border-gray-300 px-4 py-2 pr-8 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  >
                    <option disabled value="">Please select one</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <div
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                  >
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="mb-6">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="email"
                  >Email Address</label
                >
                <input
                  aria-label="Email address"
                  aria-required="true"
                  aria-invalid="true"
                  name="email"
                  type="email"
                  required
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  placeholder="Email address"
                  v-model="email"
                />
              </div>
              <div class="mb-6">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="password"
                  >Password</label
                >
                <input
                  name="password"
                  type="password"
                  aria-label="Password"
                  aria-invalid="true"
                  aria-required="true"
                  required
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  placeholder="Password"
                  v-model="password"
                />
              </div>
              <div class="mb-2">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="password"
                  >Password Confirm</label
                >
                <input
                  name="passwordConfirm"
                  type="password"
                  aria-label="Password Confirm"
                  aria-invalid="true"
                  aria-required="true"
                  required
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  placeholder="Password Confirm"
                  v-model="passwordConfirm"
                />
              </div>
            </div>

            <!-- <div v-if="errorMessage != ''" class="px-2 py-2 text-red-500">
            <p class="errorMessage">{{ errorMessage }}</p>
          </div> -->
            <div class="flex justify-start mt-3 ml-4 p-1">
              <ul>
                <li class="flex items-center py-1">
                  <div
                    :class="{
                      'bg-green-200 text-green-700':
                        password == passwordConfirm && password.length > 0,
                      'bg-red-200 text-red-700':
                        password != passwordConfirm || password.length == 0
                    }"
                    class="rounded-full p-1 fill-current"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        v-show="
                          password == passwordConfirm && password.length > 0
                        "
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                      <path
                        v-show="
                          password != passwordConfirm || password.length == 0
                        "
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <span
                    :class="{
                      'text-green-700':
                        password == passwordConfirm && password.length > 0,
                      'text-red-700':
                        password != passwordConfirm || password.length == 0
                    }"
                    class="font-medium text-sm ml-3"
                    v-text="
                      password == passwordConfirm && password.length > 0
                        ? 'Passwords match'
                        : 'Passwords do not match'
                    "
                  ></span>
                </li>
                <li class="flex items-center py-1">
                  <div
                    :class="{
                      'bg-green-200 text-green-700': passwordCorrectRule,
                      'bg-red-200 text-red-700': !passwordCorrectRule
                    }"
                    class="rounded-full p-1 fill-current"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        v-show="passwordCorrectRule"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                      <path
                        v-show="!passwordCorrectRule"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <span
                    :class="{
                      'text-green-700': passwordCorrectRule,
                      'text-red-700': !passwordCorrectRule
                    }"
                    class="font-medium text-sm ml-3"
                    v-text="
                      password.length >= 8
                        ? 'The minimum length is reached'
                        : 'At least 8 characters required'
                    "
                  ></span>
                </li>
              </ul>
            </div>

            <div class="mt-6">
              <button
                aria-label="Signup"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md"
                :class="{
                  'bg-indigo-600 hover:bg-indigo-500 text-white':
                    passwordCorrectRule && passwordMatch,
                  'bg-gray-200 text-gray-500 cursor-not-allowed':
                    !passwordCorrectRule || !passwordMatch
                }"
                :disabled="!passwordCorrectRule || !passwordMatch"
                type="submit"
              >
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    class="h-5 w-5 group-hover:text-indigo-400 transition ease-in-out duration-150"
                    :class="{
                      'text-indigo-500': passwordCorrectRule && passwordMatch,
                      'text-gray-500': !passwordCorrectRule || !passwordMatch
                    }"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      name: "",
      gender: "male",
      email: "",
      password: "",
      passwordConfirm: "",
      //error checking
      errorMessage: null
    };
  },
  computed: {
    //error checking
    passwordCorrectRule: function() {
      return this.password.length >= 8 ? true : false;
    },
    passwordMatch: function() {
      return this.password == this.passwordConfirm && this.password != ""
        ? true
        : false;
    }
  },
  methods: {
    async signup() {
      try {
        this.errorMessage = null;
        if (this.passwordMatch) {
          const register = await this.$axios.post("/auth/register", {
            name: this.name,
            gender: this.gender,
            email: this.email,
            password: this.password
          });
          if (register) {
            localStorage.setItem("access_token", register.data.token);
            localStorage.setItem("user", JSON.stringify(register.data.user));
            this.$router.push({ path: "/" });
          }
        } else {
        }
      } catch (error) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
        this.errorMessage = error.response.data;
      }
    }
  }
});
</script>
