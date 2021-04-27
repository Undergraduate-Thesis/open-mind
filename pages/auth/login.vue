<template>
  <div class="login">
    <!-- Alert Activation Successfull -->
    <div
      class="m-2 p-3 relative flex flex-col sm:flex-row sm:items-center bg-gray-200 border-2 border-black rounded-md shadow-md"
      v-if="showAlert"
    >
      <div class="text-green-500">
        <svg
          class="w-6 sm:w-5 h-6 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
      <div class="text-sm font-medium ml-3">Activation Successfull</div>
      <div class="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">
        Your account has activated. Please sigin to get more feature!
      </div>
      <div
        class="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-600 hover:text-black cursor-pointer"
        @click="showAlert = false"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </div>
    </div>

    <!-- LOGIN -->
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
            Sign in to your account
          </h2>
        </div>
        <form
          class="w-full max-w-xl mt-8 bg-white rounded-lg shadow-md p-6"
          action="#"
          method="POST"
          @submit.prevent="Sigin()"
        >
          <input type="hidden" name="remember" value="true" />
          <div class="rounded-md shadow-sm">
            <div class="mb-6">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="email"
                >Email Address</label
              >
              <input
                id="email"
                aria-label="Email address"
                aria-required="true"
                aria-invalid="true"
                name="email"
                type="email"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Email address"
                v-model="email"
              />
            </div>
            <div class="mb-2">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="password"
                >Password</label
              >
              <input
                id="password"
                name="password"
                type="password"
                aria-label="Password"
                aria-invalid="true"
                aria-describedby="errorMessage"
                aria-required="true"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Password"
                v-model="password"
              />
            </div>
          </div>
          <div v-if="errorMessage != ''" class="px-2 py-2 text-red-500">
            <p class="errorMessage">{{ errorMessage }}</p>
          </div>

          <div class="mt-6">
            <button
              aria-label="Sigin"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
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
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  middleware: "guest",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      showAlert: false
    };
  },
  created() {
    if (this.$route.query.activateAccount) {
      this.showAlert = true;
      this.$router.replace("/auth/login");
    }
  },
  methods: {
    Sigin() {
      this.errorMessage = "";
      this.$axios
        .post("/auth/login", {
          email: this.email,
          password: this.password
        })
        .then(res => {
          if (process.browser) {
            localStorage.setItem("access_token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
          }
          this.$axios.setToken(res.data.token, "Bearer");
          this.$router.push({ path: "/" });
        })
        .catch(err => {
          this.errorMessage = err.response.data;
        });
    }
  }
});
</script>
