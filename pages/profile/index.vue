<template>
  <div>
    <div class="profile__header mt-5 mb-5">
      <div class="block justify-center flex">
        <img
          class="w-40 h-40 rounded-full object-cover mr-4 shadow"
          src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          alt="avatar"
        />
      </div>
      <p class="block justify-center mt-5 mb-5 flex text-2xl font-bold">
        {{ user.name }}
      </p>
    </div>
    <div class="profile__content mx-64 px-12 py-4 bg-gray-200 rounded-md">
      <div class="button__group justify-center flex">
        <button
          @click="getArticle"
          class="border bg-gray-900 text-white -white font-normal py-2 px-4 rounded"
        >
          Your Article
        </button>
        <button
          @click="getBookmark"
          class="border bg-gray-900 text-white -white font-normal py-2 px-4 rounded"
        >
          Article Saved
        </button>
      </div>

      <!-- CONTENT -->
      <div
        v-for="(article, index) in articles"
        :key="index"
        class="card my-3 lg:flex md:flex justify-center rounded-md bg-white"
      >
        <div class="lg:w-2/6 md:w-2/6">
          <div
            class="h-64 bg-cover lg:rounded-lg h-full cursor-pointer"
            @click="openArticle(article._id)"
            style="
            background-image: url('https://images.unsplash.com/photo-1497493292307-31c376b6e479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80');
          "
          ></div>
        </div>
        <div class="pt-5 pb-6 px-6 max-w-xl lg:max-w-5xl lg:w-4/6 md:w-4/6">
          <nuxt-link
            @click.native="$event.stopImmediatePropagation()"
            :to="`/article/${article._id}`"
            ><h2 class="text-2xl text-gray-800 font-bold hover:text-blue-700">
              {{ article.title }}
            </h2>
          </nuxt-link>
          <p class="mt-5 text-gray-600 spoiler--3line">
            {{ article.content }}
          </p>
          <div class="flex justify-between mt-8">
            <!-- @click.native bertujuan untuk mematikan action @click pada div card diatas. @click.nativesama seperti onclick; event.stopPropagation di javascript -->
            <nuxt-link
              @click.native="$event.stopImmediatePropagation()"
              :to="`/article/${article._id}`"
              class="bg-gray-900 text-gray-100 px-5 py-3 font-semibold rounded"
            >
              Detail
            </nuxt-link>
            <nuxt-link
              @click.native="$event.stopImmediatePropagation()"
              :to="`/article/edit/${article._id}`"
              class="bg-gray-900 text-gray-100 px-5 py-3 font-semibold rounded"
            >
              Edit
            </nuxt-link>
            <button
              @click="deleteArticle(index)"
              to="/404"
              class="bg-gray-900 text-gray-100 px-5 py-3 font-semibold rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.spoiler--3line {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>
<script>
export default {
  layout: "container",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")) || null,
      articles: []
    };
  },
  async mounted() {
    this.getArticle();
  },
  methods: {
    async getArticle() {
      this.articles = [];
      this.articles = await this.$axios.$get(
        `/article/userArticles/${this.user.id}`
      );
    },
    async getBookmark() {
      this.articles = [];
      const bookmarks = await this.$axios.$get(
        `/user/bookmark/${this.user.id}`
      );

      bookmarks.forEach(async bookmark => {
        const article = await this.$axios.$get(
          `/article/${bookmark.article_id}`
        );

        this.articles.push(article);
      });
    },
    deleteArticle(indexArticle) {
      const removedArticle = this.articles.splice(indexArticle, 1);
      console.log(removedArticle[0]);
      this.$axios.$delete(`/article/${removedArticle[0]._id}`);
    }
  }
};
</script>
