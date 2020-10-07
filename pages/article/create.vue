<template>
  <div>
    <header class="items">
      <h1 class="text-gray-700 text-xs font-bold mb-2">Create Article</h1>
    </header>
    <main>
      <form action="#" method="POST" @submit.prevent="post()">
        <div class="mb-6">
          <label
            for="title"
            v-bind="title"
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >Title</label
          >
          <input type="text" v-model="title" placeholder="Title" />
        </div>
        <div class="mb-6">
          <label
            for="content"
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >Content</label
          >
          <textarea
            name="content"
            id="content"
            v-bind="content"
            placeholder="Title"
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <button
          class="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
        >
          POST
        </button>
      </form>
    </main>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      title: "",
      content: "",
    };
  },
  mounted() {
    console.log(this.$route.params);
  },
  methods: {
    open() {
      alert(this.title);
    },
  },
});
</script>
