<template>
  <div class="homepage">
    <div>
      <div class="max-w-7xl">
        <!-- Replace with your content -->
        <div class="py-4 bg-gray-200 h-full w-full">
          <!-- Content -->
          <div class="mx-32 text-gray-700">
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
    skeletonArticle,
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
      tags: [],
    };
  },
  async mounted() {
    this.getArticles();
  },
  methods: {
    async getArticles() {
      try {
        this.articles = await this.$axios.$get(
          `/article/filterTag/${this.$route.params.id}`
        );
      } catch (error) {
        console.log("error", error);
      }
    },
    logout() {
      localStorage.clear();
      window.location.reload(true);
      // this.$router.push({ path: "/404" });
    },
  },
});
</script>
