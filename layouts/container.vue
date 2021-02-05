<template>
  <div class="layout flex flex-col h-screen">
    <!-- if we accessed from smartphone -->
    <!-- <div
      class="absolute p-6 z-40 h-full w-full bg-black text-white text-center text-xl font-bold sm:invisible"
    >
      Mohon maaf, design dibuat khusus tablet / PC. Ubah ke mode 'Desktop Site'
      dulu kalo mau akses dari smartphone.
    </div> -->

    <!-- if web accessed from tablet or PC -->
    <header class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <!-- <img
                class="h-8 w-8"
                src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg"
                alt="Workflow logo"
              /> -->
              <div class="flex">
                <nuxt-link to="/">
                  <svg
                    v-if="currentRoute != 'Home'"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"
                      fill="rgba(56, 178, 172, 1)"
                    />
                  </svg>
                </nuxt-link>
                <span class="ml-2 text-lg text-teal-500 font-bold">{{
                  currentRoute
                }}</span>
              </div>
            </div>
          </div>
          <div class="ml-4 flex items-center md:ml-6">
            <div v-if="token == 0">
              <nuxt-link
                to="/auth/login"
                tag="button"
                aria-label="Login"
                class="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Log in
              </nuxt-link>
              <nuxt-link
                to="/auth/register"
                tag="button"
                aria-label="Create Account"
                class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Create account
              </nuxt-link>
            </div>
            <div v-else>
              <nuxt-link
                to="/article/create"
                tag="button"
                aria-label="Write Post"
                class="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Write Post
              </nuxt-link>
              <!-- <button
                  @click="logout()"
                  class="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  Log out
                </button> -->
              <button
                @click="dropdownOpen = !dropdownOpen"
                class="text-white bg-gray-900 items-center w-auto px-3 py-2 mt-0 ml-4 text-sm font-medium text-left bg-transparent rounded-md inline focus:outline-none"
              >
                <span>More</span>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  :class="{
                    'rotate-180': dropdownOpen,
                    'rotate-0': !dropdownOpen
                  }"
                  class="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>

              <div
                v-show="dropdownOpen"
                class="absolute right-2 mt-1 py-2 w-48 bg-gray-900 rounded-md shadow-xl z-20"
              >
                <nuxt-link
                  @click.native="dropdownOpen = !dropdownOpen"
                  to="/profile"
                  class="block px-4 py-2 text-white text-sm capitalize hover:bg-gray-800"
                >
                  Profile
                </nuxt-link>
                <button
                  @click="
                    logout();
                    dropdownOpen = !dropdownOpen;
                  "
                  class="block px-4 py-2 text-white text-sm capitalize hover:bg-gray-800"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="overflow-y-auto">
      <main>
        <Nuxt />
      </main>
      <footer class="py-5 bg-gray-600 text-center text-white">
        <small
          >Copyright &copy; 2020 Victory Chrisnanto Que. All Rights
          Reserved</small
        >
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      get token() {
        if (process.browser == true)
          if (localStorage.getItem("access_token") != null)
            return localStorage.getItem("access_token") || "";
          else return 0;
      },
      dropdownOpen: false,
      currentRoute: ""
    };
  },
  mounted() {
    if (this.$route.name == "index") {
      this.currentRoute = "Home";
    } else if (this.$route.name == "article-id") {
      this.currentRoute = "Detail Article";
    } else if (this.$route.name == "profile") {
      this.currentRoute = "Profile";
    }
  },
  watch: {
    $route(to, from) {
      if (this.$route.name == "index") {
        this.currentRoute = "Home";
      } else if (this.$route.name == "article-id") {
        this.currentRoute = "Detail Article";
      } else if (this.$route.name == "profile") {
        this.currentRoute = "Profile";
      }
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      window.location.reload(true);
    }
  }
};
</script>
