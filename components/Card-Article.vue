<template>
  <div class="card">
    <div class="mx-auto px-4 py-8 max-w-xl my-20">
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
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
const axios = require("@nuxtjs/axios");

export default Vue.extend({
  props: {
    article: {},
  },
  async mounted() {
    console.log(this.article);
  },
});
</script>
