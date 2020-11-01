<template>
  <div id="article">
    <div id="article__header">
      <h1 class="text-center text-4xl font-bold">{{ article.title }}</h1>
    </div>
    <div class="article__content h-full lg:px-10 lg:mx-64 py-4 text-xl">
      <div id="content" v-html="article.content"></div>
      <div class="summary">
        <h2 class="mt-6 text-3xl font-bold">Summary</h2>
        <p>{{ article.summary }}</p>
      </div>
    </div>
    <div class="article__comment"></div>
  </div>
</template>
<script>
export default {
  layout: "container",
  data() {
    return {
      article: []
    };
  },
  async mounted() {
    try {
      //$axios.$get() it's same as $axios.get().data
      const article = await this.$axios.$get(
        `/article/${this.$route.params.id}`
      );
      const md = require("markdown-it")();

      article.content = md.render(article.content);
      this.article = article;
    } catch (error) {
      console.log("error", error);
    }
  }
};
</script>
