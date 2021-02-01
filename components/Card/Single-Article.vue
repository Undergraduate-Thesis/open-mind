<template>
  <div class="card">
    <div class="my-3 md:flex lg:flex justify-center rounded-md bg-white">
      <div class=" md:w-2/5 lg:w-2/5">
        <div
          v-if="thumbnail != ''"
          class="h-64 bg-cover rounded-lg h-full cursor-pointer"
          @click="openArticle(article._id)"
          :style="{ backgroundImage: `url(${thumbnail})` }"
        ></div>
        <div
          v-else
          class="h-64 bg-cover rounded-lg h-full cursor-pointer"
          @click="openArticle(article._id)"
          style="background-image: url('https://images.unsplash.com/photo-1587814969489-e5df12e17391?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8c29jaWFsJTIwZGlzdGFuY2UlMjBhbmQlMjBzdGF5JTIwc2FmZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60');"
        ></div>
      </div>
      <div class="pt-5 pb-6 px-6 max-w-xl lg:max-w-5xl md:w-3/5 lg:w-3/5">
        <nuxt-link :to="`/article/${article._id}`"
          ><h2 class="text-3xl text-gray-800 font-bold hover:text-blue-700">
            {{ article.title }}
          </h2>
        </nuxt-link>
        <p class="mt-4 text-gray-600 spoiler--3line">
          {{ article.content }}
        </p>
        <div class="flex items-center justify-between mt-8">
          <div id="like">
            <p class="inline-block text-gray-600 font-semibold">
              {{ articleLikes.length }}
            </p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              class="inline-block h-6 w-6 fill-current"
            >
              <path fill="none" d="M0 0H24V24H0z" />
              <path
                d="M20.243 4.757c2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228 2.349-2.109 5.979-2.039 8.242.228zM5.172 6.172c-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454-1.487-1.49-3.881-1.562-5.453-.186l-4.202 4.203-1.415-1.414 2.825-2.827-.082-.069c-1.575-1.265-3.877-1.157-5.328.295z"
              />
            </svg>
            <p class="inline-block text-gray-600 font-semibold">
              {{ articleComment.length }}
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              class="inline-block h-6 w-6 fill-current"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M10 3h4a8 8 0 1 1 0 16v3.5c-5-2-12-5-12-11.5a8 8 0 0 1 8-8zm2 14h2a6 6 0 1 0 0-12h-4a6 6 0 0 0-6 6c0 3.61 2.462 5.966 8 8.48V17z"
              />
            </svg>
          </div>

          <div>
            <!-- @click.native bertujuan untuk mematikan action @click pada div card diatas. @click.nativesama seperti onclick; event.stopPropagation di javascript -->
            <nuxt-link
              @click.native="$event.stopImmediatePropagation()"
              :to="`/article/${article._id}`"
              class="bg-gray-900 text-gray-100 px-5 py-3 font-semibold rounded"
            >
              Detail
            </nuxt-link>
            <!-- <nuxt-link
              @click.native="$event.stopImmediatePropagation()"
              to="/404"
              class="bg-gray-900 text-gray-100 px-5 py-3 font-semibold rounded"
            >
              Detail
            </nuxt-link> -->
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
<script lang="ts">
import Vue from "vue";
const axios = require("@nuxtjs/axios");

export default Vue.extend({
  props: {
    article: {}
  },
  data() {
    return {
      thumbnail: "",
      spoiler: "",
      articleLikes: [],
      articleComment: []
    };
  },
  async mounted() {
    const sentences = (this.article as any).content.match(/[^\.!\?]+[\.!\?]+/g);
    if (sentences != null) {
      sentences.forEach((element: String) => {
        this.spoiler += element;
      });
    } else {
      this.spoiler = (this.article as any).content;
    }

    // Get thumbnail
    if ((this.article as any).thumbnail != null) {
      let thumbnailName = (this.article as any).thumbnail.fieldname;
      const thumbnailType = (this.article as any).thumbnail.mimetype.replace(
        "image/",
        ""
      );
      const getThumbnail = await this.$axios.$get(
        `/article/thumbnail/${thumbnailName}.${thumbnailType}`
      );
      const b64encoded = Buffer.from(getThumbnail.Body.data).toString("base64");
      this.thumbnail = "data:image/jpg;base64," + b64encoded;
    }

    // Get Likes
    this.articleLikes = await this.$axios.$get(
      `/article/like/${(this.article as any)._id}`
    );

    // Get Comment
    this.articleComment = await this.$axios.$get(
      `/article/comment/${(this.article as any)._id}`
    );
  },
  methods: {
    openArticle(id: any) {
      this.$router.push({ path: "/404" });
      this.$router.push({ path: `/article/${id}` });
    },
    stopPropagation(e: Event, path: string) {
      e.stopPropagation();
      this.$router.push({ path: path });
    }
  }
});
</script>
