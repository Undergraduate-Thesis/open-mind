<template>
  <div>
    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img
                class="h-8 w-8"
                src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg"
                alt="Workflow logo"
              />
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
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
          </div>
        </div>
      </div>
    </nav>

    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <h1 class="text-3xl font-bold leading-tight text-gray-900">
            Good Morning
          </h1>
          <!-- component -->
          <!-- This is an example component -->
          <div class="pt-2 relative text-gray-600">
            <input
              class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
            />
            <button type="submit" class="absolute right-0 top-0 mt-5 mr-4">
              <svg
                class="text-gray-600 h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                style="enable-background: new 0 0 56.966 56.966"
                xml:space="preserve"
                width="512px"
                height="512px"
              >
                <path
                  d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main>
      <div class="max-w-7xl">
        <!-- Replace with your content -->
        <div class="lg:pl-20 pr-8 py-4 bg-gray-200 h-screen w-screen">
          <div class="flex flex-wrap">
            <!-- Content -->
            <div class="w-4/6 mx-6 text-gray-700">
              <cardArticle
                v-for="article in articles"
                :key="article._id"
                :article="article"
              />
            </div>
            <div class="w-1/6 my-3 p-4 bg-white hidden lg:block">
              <h1 class="text-2xl text-gray-600 font-bold mb-4">Tag Populer</h1>
              <div class="flex flex-wrap hover:bg-gray-200 hover-trigger">
                <nuxt-link to="/404" class="w-4/6 break-words mb-2">
                  #webdev
                </nuxt-link>
                <button
                  class="w-2/6 inline-block text-sm bg-blue-500 hover:bg-blue-700 hover-target text-white font-bold py-1 px-2 rounded"
                >
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>
<style scoped>
.hover-trigger .hover-target {
  display: none;
}

.hover-trigger:hover .hover-target {
  display: inline-block;
}
</style>

<script>
import Vue from "vue";
import cardArticle from "@/components/Card-Article";

export default Vue.extend({
  components: {
    cardArticle,
  },
  data() {
    return {
      articles: [],
    };
  },
  mounted() {
    // this.$myInjectedFunction("works in mounted");
    this.$axios
      .get("http://localhost:3000/api/v1/article")
      .then((res) => {
        this.articles = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
</script>
