<template>
  <div class="wrapper">
    <header class="items">
      <h1>Create Article</h1>
    </header>
    <div class="items contents">
      <div class="article__header">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Add a cover image</button>
      </div>
      <div class="article__content">
        <textarea class="rounded-lg" name="detail" id="detail" cols="30" rows="10">
Write your post content here...
        </textarea>
      </div>
      <div class="article__footer">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Add a cover image</button>
      </div>
    </div>
    <footer class="items --text-xs">By Victory Chrisnanto Que</footer>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  mounted() {
    console.log(this.$route.params);
  },
});
</script>
