<template>
  <div>
    <!-- DELETE ARTICLE -->
    <delete-article
      v-show="dialogBoxDeleteArticle"
      @closeDialogBox="dialogBoxDeleteArticle = false"
      @deleteArticle="deleteArticle"
    ></delete-article>

    <!-- REMOVE BOOKMARK -->
    <remove-bookmark
      v-show="dialogBoxRemoveBookmark"
      @closeDialogBox="dialogBoxRemoveBookmark = false"
      @removeBookmark="removeBookmark"
    ></remove-bookmark>

    <!-- PROFILE -->
    <div class="profile__header mt-5 mb-5">
      <div class="block justify-center flex">
        <img
          class="w-40 h-40 rounded-full object-cover shadow"
          :src="user.photo.link"
          alt="avatar"
        />
        <div class="relative">
          <nuxt-link
            to="/profile/update"
            tag="button"
            class="absolute bottom-0 -left-4 w-32 px-1.5 py-1.5 border border-yellow-500 text-yellow-500 hover:text-white hover:bg-yellow-600 focus:outline-none rounded-md"
          >
            Update Profile
          </nuxt-link>
        </div>
      </div>
      <p class="block justify-center mt-5 mb-5 flex text-2xl font-bold">
        {{ user.name }}
      </p>
    </div>
    <div
      class="profile__content mx-64 px-12 py-4 bg-gray-200 bg-opacity-50 rounded-md"
    >
      <div class="button__group justify-center flex">
        <div class="flex cursor-pointer">
          <button
            @click="
              getArticle();
              toogleArticle = true;
            "
            class="py-2 px-6 bg-white focus:outline-none shadow-md"
            :class="[toogleArticle ? focusTab : unfocusTab]"
          >
            Your Article ({{ this.articles.length }})
          </button>
          <button
            @click="
              getBookmark();
              toogleArticle = false;
            "
            class="py-2 px-6 bg-white focus:outline-none shadow-lg"
            :class="[!toogleArticle ? focusTab : unfocusTab]"
          >
            Article Saved ({{ this.bookmarks.length }})
          </button>
        </div>
      </div>

      <!-- CONTENT -->
      <!-- Article -->
      <div v-if="toogleArticle == true">
        <div
          v-for="(article, index) in articles"
          :key="index"
          class="card my-3 lg:flex md:flex justify-center rounded-md bg-white"
        >
          <div class="lg:w-2/6 md:w-2/6">
            <div
              v-if="article.thumbnail != null"
              class="h-64 bg-cover rounded-lg h-full cursor-pointer"
              @click="openArticle(article._id)"
              :style="{ backgroundImage: `url(${article.thumbnail.link})` }"
            ></div>
            <div
              v-else
              class="h-64 bg-cover bg-no-repeat bg-center rounded-lg h-full cursor-pointer"
              @click="openArticle(article._id)"
              style="background-image: url('https://s3-id-jkt-1.kilatstorage.id/nanas-experience/victor/article/default_thumbnail.jpg');"
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
                v-if="toogleArticle == true"
                @click.native="$event.stopImmediatePropagation()"
                :to="`/article/edit/${article._id}`"
                class="bg-gray-900 text-gray-100 px-5 py-3 font-semibold rounded"
              >
                Edit
              </nuxt-link>

              <!-- Delete -->
              <button
                @click="
                  dialogBoxDeleteArticle = true;
                  currentIndexDeleteArticle = index;
                "
                to="/404"
                class="bg-gray-900 text-gray-100 px-5 py-3 font-semibold rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Bookmarks -->
      <div v-else>
        <div
          v-for="(bookmark, index) in bookmarks"
          :key="index"
          class="card my-3 lg:flex md:flex justify-center rounded-md bg-white"
        >
          <div class="lg:w-2/6 md:w-2/6">
            <div
              v-if="bookmark.thumbnail != null"
              class="h-64 bg-cover rounded-lg h-full cursor-pointer"
              @click="openArticle(article._id)"
              :style="{ backgroundImage: `url(${bookmark.thumbnail.link})` }"
            ></div>
            <div
              v-else
              class="h-64 bg-cover bg-no-repeat bg-center rounded-lg h-full cursor-pointer"
              @click="openArticle(bookmark._id)"
              style="background-image: url('https://s3-id-jkt-1.kilatstorage.id/nanas-experience/victor/article/default_thumbnail.jpg');"
            ></div>
          </div>
          <div class="pt-5 pb-6 px-6 max-w-xl lg:max-w-5xl lg:w-4/6 md:w-4/6">
            <nuxt-link
              @click.native="$event.stopImmediatePropagation()"
              :to="`/article/${bookmark._id}`"
              ><h2 class="text-2xl text-gray-800 font-bold hover:text-blue-700">
                {{ bookmark.title }}
              </h2>
            </nuxt-link>
            <p class="mt-5 text-gray-600 spoiler--3line">
              {{ bookmark.content }}
            </p>
            <div class="flex justify-between mt-8">
              <!-- @click.native bertujuan untuk mematikan action @click pada div card diatas. @click.nativesama seperti onclick; event.stopPropagation di javascript -->
              <nuxt-link
                @click.native="$event.stopImmediatePropagation()"
                :to="`/article/${bookmark._id}`"
                class="bg-gray-900 text-gray-100 px-5 py-3 font-semibold rounded"
              >
                Detail
              </nuxt-link>

              <!-- Remove -->
              <button
                @click="
                  dialogBoxRemoveBookmark = true;
                  currentIndexRemoveBookmark = index;
                "
                to="/404"
                class="bg-gray-900 text-gray-100 px-5 py-3 font-semibold rounded"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.-left-4 {
  left: -1rem;
}
</style>
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
import deleteArticle from "~/components/Dialogbox/deleteArticle.vue";
import removeBookmark from "~/components/Dialogbox/removeBookmark.vue";
export default {
  layout: "container",
  components: { deleteArticle, removeBookmark },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")) || null,
      articles: [],
      bookmarks: [],
      dialogBoxDeleteArticle: false,
      currentIndexDeleteArticle: null,
      dialogBoxRemoveBookmark: false,
      currentIndexRemoveBookmark: null,
      toogleArticle: true,
      focusTab: "border-b-2 border-black",
      unfocusTab: "text-gray-700 bg-gray-300 hover:bg-gray-200"
    };
  },
  async mounted() {
    this.getArticle();
    this.getBookmark();
  },
  methods: {
    async getArticle() {
      // Fetch article
      this.articles = await this.$axios.$get(
        `/article/userArticles/${this.user.id}`
      );
    },
    async getBookmark() {
      const bookmarks = await this.$axios.$get(
        `/user/bookmark/${this.user.id}`
      );

      const getArticles = new Promise(resolve => {
        let articles = [];
        bookmarks.forEach(async (bookmark, index) => {
          let article = await this.$axios.$get(
            `/article/${bookmark.article_id}`
          );

          //insert bookmark_id in object article
          article.bookmark_id = bookmark._id;

          articles.push(article);

          if (index === bookmarks.length - 1) resolve(articles);
        });
      });

      getArticles.then(articles => {
        this.bookmarks = articles;
      });
    },
    async deleteArticle() {
      const removedArticle = this.articles.splice(
        this.currentIndexDeleteArticle,
        1
      );
      await this.$axios.$delete(`/article/${removedArticle[0]._id}`);
      this.dialogBoxDeleteArticle = false;
    },
    async removeBookmark() {
      const removeBookmark = this.bookmarks.splice(
        this.currentIndexRemoveBookmark,
        1
      );
      await this.$axios.$delete(
        `/user/bookmark/${removeBookmark[0].bookmark_id}`
      );
      this.dialogBoxRemoveBookmark = false;
    }
  }
};
</script>
