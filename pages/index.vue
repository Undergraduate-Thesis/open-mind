<template>
  <div class="homepage">
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <h1 class="leading-tight text-gray-900">
            {{ currentTime }}, {{ user != null ? user.name : "" }}
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
    </div>

    <div>
      <div class="max-w-7xl">
        <!-- Replace with your content -->
        <div class="lg:pl-20 pr-8 py-4 bg-gray-200 h-full w-full">
          <div class="flex flex-wrap">
            <!-- Content -->
            <div class="w-4/6 mx-6 text-gray-700">
              <div v-if="articles.length == 0">
                <skeletonArticle v-for="index in 5" :key="index" />
              </div>
              <div v-else>
                <singleArticle
                  v-for="article in articles"
                  :key="article._id"
                  :article="article"
                />
              </div>
            </div>
            <div class="w-1/6 my-3 p-4 bg-white hidden lg:block rounded-md">
              <h1 class="text-2xl font-bold mb-4">Tag Populer</h1>
              <div
                v-for="tag in tags"
                :key="tag._id"
                class="flex flex-wrap hover:bg-gray-200 hover-trigger"
              >
                <nuxt-link
                  to="/404"
                  class="w-4/6 break-words mb-2 text-gray-600"
                >
                  #{{ tag.name }}
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
    </div>
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
import singleArticle from "@/components/Card/Single-Article";
import skeletonArticle from "@/components/Skeleton/Single-Article";

export default Vue.extend({
  layout: "container",
  components: {
    singleArticle,
    skeletonArticle
  },
  data() {
    return {
      get token() {
        if (process.browser == true)
          if (localStorage.getItem("access_token") != null)
            return localStorage.getItem("access_token") || "";
          else return 0;
      },
      get user() {
        if (process.browser == true)
          if (localStorage.getItem("user") != null)
            return JSON.parse(localStorage.getItem("user") || "");
          else return 0;
      },
      currentTime: "",
      articles: [],
      tags: []
    };
  },
  async mounted() {
    // this.$myInjectedFunction("works in mounted");
    this.defineCurrentTime();
    this.getArticles();
    this.getTags();
  },
  methods: {
    async getTags() {
      try {
        this.tags = await this.$axios.$get("/tag");
      } catch (error) {
        console.log("error", error);
      }
    },
    async getArticles() {
      try {
        this.articles = await this.$axios.$get("/article");
      } catch (error) {
        console.log("error", error);
      }
    },
    defineCurrentTime() {
      const today = new Date();
      const currentHour = today.getHours();

      if (currentHour < 12) {
        this.currentTime = "Good Morning";
      } else if (currentHour < 18) {
        this.currentTime = "Good Afternoon";
      } else {
        this.currentTime = "Good Evening";
      }
    },
    logout() {
      localStorage.clear();
      window.location.reload(true);
    }
  }
});
</script>
