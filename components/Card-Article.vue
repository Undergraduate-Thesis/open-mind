<template>
  <div class="card">
    <!-- <div class="px-4 py-8 max-w-xl">
      <div class="bg-white shadow-2xl rounded-lg mb-6 tracking-wide">
        <div class="md:flex-shrink-0">
          <img
            src="https://ik.imagekit.io/q5edmtudmz/post1_fOFO9VDzENE.jpg"
            alt="mountains"
            class="w-full h-64 rounded-lg rounded-b-none"
          />
        </div>
        <div class="px-4 py-2 mt-2">
          <h2 class="font-bold text-2xl text-gray-800 tracking-normal">
            {{ article.title }}
          </h2>
          <p class="text-sm text-gray-700 px-2 mr-1">
            {{ article.content }}
          </p>
          <div class="author flex items-center -ml-3 my-3">
            <div class="user-logo">
              <img
                class="w-12 h-12 object-cover rounded-full mx-4 shadow"
                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80"
                alt="avatar"
              />
            </div>
            <h2 class="text-sm tracking-tighter text-gray-900">
              <a href="#">{{ article.author }}</a>
              <span class="text-gray-600">{{ article.created_at }}</span>
            </h2>
          </div>
        </div>
      </div>
    </div> -->
    <div
      class="my-3 lg:flex lg:justify-center bg-white cursor-pointer"
      @click="openArticle()"
    >
      <div class="lg:w-2/5">
        <div
          class="h-64 bg-cover lg:rounded-lg lg:h-full"
          style="
            background-image: url('https://images.unsplash.com/photo-1497493292307-31c376b6e479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80');
          "
        ></div>
      </div>
      <div class="py-12 px-6 max-w-xl lg:max-w-5xl lg:w-3/5">
        <h2 class="text-3xl text-gray-800 font-bold">
          {{ article.title }}
        </h2>
        <p class="mt-4 text-gray-600 spoiler--3line">
          {{ article.content }}
        </p>
        <div class="mt-8">
          <!-- @click.native bertujuan untuk mematikan action @click pada div card diatas. @click.nativesama seperti onclick; event.stopPropagation di javascript -->
          <nuxt-link
            @click.native="$event.stopImmediatePropagation()"
            to="/404"
            class="bg-gray-900 text-gray-100 px-5 py-3 font-semibold rounded"
          >
            save
          </nuxt-link>
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
    article: {},
  },
  data() {
    return {
      spoiler: "",
    };
  },
  async mounted() {
    const sentences = (this.article as any).content.match(/[^\.!\?]+[\.!\?]+/g);
    sentences.forEach((element: String) => {
      this.spoiler += element;
    });
  },
  methods: {
    openArticle() {
      this.$router.push({ path: "/404" });
    },
    stopPropagation(e: Event, path: string) {
      e.stopPropagation();
      this.$router.push({ path: path });
    },
  },
});
</script>
