<template>
  <div>
    <div
      id="header"
      class="flex items-center justify-between h-16 bg-gray-800 mb-6 px-32"
    >
      <div class="flex items-center">
        <div class="text-lg text-teal-500 font-bold">Create Article</div>
        <input type="file" name="text" value="text" @change="readFile($event)" />
      </div>
      <div id="action">
        <button
          v-if="preview == false"
          @click="
            preview = !preview;
            readMarkdon();
          "
          class="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
        >
          Preview
        </button>
        <button
          v-else
          @click="preview = !preview"
          class="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
        >
          Edit
        </button>
        <button
          @click="publish()"
          class="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
        >
          Publish
        </button>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div class="w-3/6 ml-48 mr-32 mt-12">
        <div v-if="preview == false" id="edit-mode">
          <div class="mb-2">
            <resizable-textarea>
              <textarea
                name="title"
                id="title"
                v-model="title"
                placeholder="Title"
                class="w-full outline-none resize-none text-3xl font-bold"
              ></textarea>
            </resizable-textarea>
          </div>
          <div class="mb-6">
            <resizable-textarea>
              <textarea
                name="tag"
                id="tag"
                v-model="tag"
                placeholder="Tag"
                class="w-full outline-none resize-none"
              ></textarea>
            </resizable-textarea>
          </div>
          <resizable-textarea>
            <textarea
              name="content"
              id="content"
              v-model="content"
              placeholder="Write your article"
              class="w-full outline-none resize-none"
            ></textarea>
          </resizable-textarea>
        </div>
        <div v-else id="preview-mode"></div>
      </div>

      <div id="hint" class="w-1/4 h-screen p-8 border-l-2 border-gray-400">
        <div class="mb-6">
          <h4>Title</h4>
          <p class="text-gray-600">
            Think of your post title as a super short (but compelling!) description — like
            an overview of the actual post in one short sentence.
          </p>
        </div>
        <div class="mb-6">
          <h4>Tag</h4>
        </div>
        <div class="mb-6">
          <h4>Content</h4>
          <p class="text-gray-600">we support the use of markdown in writing articles.</p>
          <p class="text-gray-600">
            You can see the markdown documentation
            <a href="https://www.markdownguide.org/cheat-sheet/" class="text-blue-600">
              here</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import ResizableTextarea from "@/plugins/ResizableTextarea.js";
export default Vue.extend({
  components: { ResizableTextarea },
  data() {
    return {
      title: "",
      content: "",
      tag: "",
      preview: false,
    };
  },
  mounted() {
    console.log(this.$route.params);
  },
  methods: {
    readFile(event) {
      const fs = require("fs");
      const file = event.target.files[0];
      var fr = new FileReader();
      fr.onload = function () {
        console.log(fr.result);
      };

      fr.readAsText(file);
    },
    readMarkdon() {
      alert("masuk");
    },
    asyncData({ app, $getSummary }) {
      $getSummary("asyncData");
      // If using Nuxt <= 2.12, use 👇
      app.$getSummary("asyncData");
    },
    publish() {
      const user = JSON.parse(localStorage.getItem("user"));
      const tags = this.tag.split(" ");

      const params = {
        title: this.title,
        content: this.content,
        tags: tags,
        author: user.id,
      };

      this.$axios
        .post("/article", params)
        .then((res) => {
          if (res.status == 201) {
            this.$router.push({ path: "/" });
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
  },
});
</script>
