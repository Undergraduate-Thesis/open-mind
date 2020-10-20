<template>
  <div class="layout flex flex-col h-screen">
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
              <nuxt-link to="/" class="text-lg text-teal-500 font-bold"
                >LOGO</nuxt-link
              >
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <div v-if="token == 0">
                <nuxt-link
                  to="/auth/login"
                  tag="button"
                  class="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  Log in
                </nuxt-link>
                <nuxt-link
                  to="/auth/register"
                  tag="button"
                  class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  Create account
                </nuxt-link>
              </div>
              <div v-else>
                <nuxt-link
                  to="/article/create"
                  tag="button"
                  class="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  Write Post
                </nuxt-link>
                <button
                  @click="logout()"
                  class="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
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
      }
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      window.location.reload(true);
    }
  }
};
</script>
