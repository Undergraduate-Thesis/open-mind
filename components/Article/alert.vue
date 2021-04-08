<template>
  <div
    class="absolute w-screen min-h-screen bg-black bg-opacity-50 flex items-center justify-center px-5 py-5"
  >
    <div
      class="fixed w-full rounded-lg bg-white shadow-lg text-gray-800"
      style="max-width: 500px"
    >
      <!-- HEADER -->
      <div
        class="w-full bg-gray-800 rounded-t-lg text-xl py-2 font-bold text-white text-center"
      >
        Your article cannot be published.
      </div>
      <div class="mx-auto px-5 pt-5 pb-4">
        <div class="w-full mb-4">
          <p class="font-bold text-gray-600 px-5">
            The system found an error:
            <span class="text-red-600" v-if="title == ''"
              >Title cannot be empty!</span
            >
            <span class="text-red-600" v-else-if="content == ''"
              >Content cannot be empty!</span
            >
            <span class="text-red-600" v-else-if="tagNotExists.length != 0">
              The tags used must be contained in the content of the article.
            </span>
          </p>
        </div>
        <!-- <div class="flex"> -->
        <div class="flex justify-center">
          <button
            @click="$emit('closeAlert')"
            class="justify-center px-6 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
          >
            Oke
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
@import url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);
</style>
<script>
export default {
  props: ["title", "content", "tagNotExists"]
};
</script>
