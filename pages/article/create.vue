<template>
  <div>
    <alert
      v-if="showAlert"
      @closeAlert="showAlert = false"
      :tagNotExists="tagNotExists"
      :content="content"
      :title="title"
    ></alert>
    <div
      id="header"
      class="flex items-center justify-between h-16 bg-gray-800 pl-4 pr-4 lg:pl-8 lg:pr-32"
    >
      <div class="flex items-center">
        <div class="flex">
          <nuxt-link to="/">
            <svg
              v-if="currentRoute != 'Home'"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"
                fill="rgba(56, 178, 172, 1)"
              />
            </svg>
          </nuxt-link>
          <div class="ml-2 text-lg text-teal-500 font-bold">Create Article</div>
        </div>
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
    <!-- EDIT MODE -->
    <div v-if="preview == false" class="lg:flex lg:flex-wrap mt-2">
      <div class="lg:w-3/6 mx-12 mt-6 lg:ml-32 lg:mr-32 lg:mt-12">
        <div id="edit-mode">
          <div class="mb-3 flex flex-row-reverse">
            <input
              id="browseThumbnail"
              type="file"
              name="text"
              value="text"
              accept="image/jpeg, image/png"
              @change="setThumbnail($event)"
              hidden
            />
            <div v-if="thumbnail == null">
              <button
                @mouseover="colorImageIcon = 'rgba(255,255,255,1)'"
                @mouseleave="colorImageIcon = 'rgba(0,0,0,1)'"
                @click="triggerButtonThumbnail"
                class="mr-4 bg-white text-gray-800 rounded border-b-2 border-gray-800 hover:border-gray-600 hover:bg-gray-800 hover:text-white shadow-md py-2 px-6 inline-flex items-center focus:outline-none"
              >
                <span class="mr-2">Add Thumbnail</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M4.828 21l-.02.02-.021-.02H2.992A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H4.828zM20 15V5H4v14L14 9l6 6zm0 2.828l-6-6L6.828 19H20v-1.172zM8 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                    :fill="colorImageIcon"
                  />
                </svg>
              </button>
            </div>
            <div v-else>
              <span>{{ thumbnail.name }}</span>
              <button
                @mouseover="colorImageChangeIcon = 'rgba(255,255,255,1)'"
                @mouseleave="colorImageChangeIcon = 'rgba(0,0,0,1)'"
                @click="triggerButtonThumbnail"
                class="bg-white text-gray-800 rounded border-b-2 border-yellow-600 hover:border-yellow-800 hover:bg-yellow-700 hover:text-white shadow-md py-2 px-6 inline-flex items-center focus:outline-none"
              >
                <span class="mr-2">Change</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M4.828 21l-.02.02-.021-.02H2.992A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H4.828zM20 15V5H4v14L14 9l6 6zm0 2.828l-6-6L6.828 19H20v-1.172zM8 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                    :fill="colorImageChangeIcon"
                  />
                </svg>
              </button>
              <button
                @mouseover="colorCloseIcon = 'rgba(255,255,255,1)'"
                @mouseleave="colorCloseIcon = 'rgba(0,0,0,1)'"
                @click="removeThumbnail"
                class="mr-10 bg-white text-gray-800 rounded border-b-2 border-red-600 hover:border-red-800 hover:bg-red-700 hover:text-white shadow-md py-2 px-6 inline-flex items-center focus:outline-none"
              >
                <span class="mr-2">Remove</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
                    :fill="colorCloseIcon"
                  />
                </svg>
              </button>
            </div>
          </div>
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
          <div v-if="content != ''">
            <resizable-textarea>
              <textarea
                name="content"
                id="content"
                v-model="content"
                placeholder="Write your article"
                class="w-full outline-none resize-none"
                v-focus
              ></textarea>
            </resizable-textarea>
          </div>
          <div v-else>
            <input
              id="browseFile"
              type="file"
              name="text"
              value="text"
              accept="text/plain, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .doc, .docx"
              @change="readFile($event)"
              hidden
            />
            <textarea
              name="content"
              v-model="content"
              placeholder="Write your article or "
              class="outline-none resize-none align-middle"
            ></textarea>
            <button @click="triggerButtonFile">Browse file</button>
          </div>
        </div>
      </div>

      <div
        id="hint"
        class="hidden lg:inline w-3/12 h-screen p-8 border-l-2 border-gray-400"
      >
        <div class="mb-6">
          <h4>Title</h4>
          <p class="text-gray-600">
            Think of your post title as a super short (but compelling!)
            description — like an overview of the actual post in one short
            sentence.
          </p>
        </div>
        <div class="mb-6">
          <h4>Tag</h4>
        </div>
        <div class="mb-6">
          <h4>Content</h4>
          <p class="text-gray-600">
            we support the use of markdown in writing articles.
          </p>
          <p class="text-gray-600">
            You can see the markdown documentation
            <a
              href="https://www.markdownguide.org/cheat-sheet/"
              class="text-blue-600"
            >
              here</a
            >
          </p>
        </div>
      </div>
    </div>
    <!-- PREVIEW MODE -->
    <div v-else id="preview-mode" class="h-full bg-gray-200 px-4 py-4 lg:px-64">
      <div class="bg-white rounded-lg">
        <!-- Thumbnail -->
        <div class="article__image mb-6">
          <img
            v-if="thumbnailPreview != ''"
            class="object-cover w-full h-64 rounded-t-lg"
            :src="thumbnailPreview"
            alt="article image"
          />
          <img
            v-else
            class="object-cover w-full h-64 rounded-t-lg"
            src="https://images.unsplash.com/photo-1587814969489-e5df12e17391?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8c29jaWFsJTIwZGlzdGFuY2UlMjBhbmQlMjBzdGF5JTIwc2FmZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="article image"
          />
        </div>
        <div class="px-4 py-4 lg:px-12">
          <!-- Tags -->
          <div class="article__tag relative">
            <span
              v-for="tag in tagsPreview"
              :key="tag"
              class="absloute bottom-0 bg-indigo-600 mr-2 px-2 py-1 text-white rounded-md"
              >{{ tag }}
            </span>
          </div>

          <div class="article__title mb-2">
            <h1 class="text-2xl lg:text-4xl font-bold">{{ title }}</h1>
          </div>
          <div class="article__author mb-6">
            <p class="text-lg">{{ user.name }}</p>
          </div>
          <div class="article__content h-full text-xl">
            <div v-html="contentPreview"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import ResizableTextarea from "@/plugins/ResizableTextarea.js";
import Alert from "@/components/Article/alert";
import docx4js from "docx4js";
import Docxtemplater from "docxtemplater";
export default Vue.extend({
  components: { ResizableTextarea, Alert },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      thumbnail: null,
      thumbnailPreview: "",
      title: "",
      content: "",
      tag: "",
      preview: false,
      test: true,
      contentPreview: null,
      tagsPreview: [],
      tagNotExists: [],

      // Change Color Focus
      colorImageIcon: "rgba(0,0,0,1)",
      colorCloseIcon: "rgba(0,0,0,1)",
      colorImageChangeIcon: "rgba(0,0,0,1)",

      // Alert Box
      showAlert: false
    };
  },
  directives: {
    focus: {
      // directive definition
      inserted: function(el) {
        el.focus();
      }
    }
  },
  watch: {
    content: function(val) {
      localStorage.setItem("ongoing-article", val);
    }
  },
  mounted() {
    if (localStorage.getItem("ongoing-article") != null)
      this.content = localStorage.getItem("ongoing-article");
  },
  methods: {
    triggerButtonFile() {
      const button = document.querySelector("#browseFile");
      button.click();
    },
    triggerButtonThumbnail() {
      const button = document.querySelector("#browseThumbnail");
      button.click();
    },
    removeThumbnail() {
      this.thumbnail = null;
    },
    async readFile(event) {
      const file = event.target.files[0];
      if (file.type == "text/plain") {
        let fr = new FileReader();
        fr.onload = e => {
          this.content = e.target.result;
        };

        // fr.readAsText(file);
        fr.readAsText(file);
      } else {
        docx4js.load(file).then(docx => {
          var doc = new Docxtemplater().loadZip(docx.raw);
          this.content = doc.getFullText();
        });
      }
    },
    setThumbnail(event) {
      const file = event.target.files[0];
      this.thumbnail = file;

      // Change file to url for preview into img tag
      const reader = new FileReader();
      reader.onload = e => {
        this.thumbnailPreview = reader.result;
      };
      reader.readAsDataURL(file);
    },
    async readMarkdon() {
      this.tagsPreview = this.tag.split(" ");
      if (this.tagsPreview.length != 0 && this.tagsPreview[0] == "") {
        this.tagsPreview = [];
      }
      const MarkdownIt = require("markdown-it"),
        md = new MarkdownIt();

      let render = md.render(this.content);
      render = await render.replace(/<\/p[^>]*>/g, "</p><br />");
      // this.contentPreview = md.render(this.content);
      this.contentPreview = render;
    },
    asyncData({ app, $getSummary }) {
      $getSummary("asyncData");
      // If using Nuxt <= 2.12, use 👇
      app.$getSummary("asyncData");
    },
    async publish() {
      const user = JSON.parse(localStorage.getItem("user"));
      const tags = this.tag.split(" ");

      let data = new FormData();

      // Validation Tag
      // const tagNotExists = [];
      const contentWithoutSpace = this.content.replace(" ", "");
      tags.forEach(tag => {
        let baseTag = tag.replace("#", "");
        baseTag = baseTag.replace(/([a-zA-Z])(?=[A-Z])/g, "$1-").toLowerCase();
        const tagValues = baseTag.split("-");

        tagValues.forEach(value => {
          const pattern = new RegExp(value, "i");

          const filter = contentWithoutSpace.match(pattern);
          if (filter == null) {
            this.tagNotExists.push(tag);
          }
        });
        data.append("tags[]", tag);
      });

      if (
        this.tagNotExists.length != 0 ||
        this.title == "" ||
        this.content == ""
      ) {
        this.showAlert = true;
      } else {
        // FIXME: remove summary variable after summary get handle in backend
        const summary = await this.$summary(this.content);

        data.append("title", this.title);
        data.append("file", this.thumbnail);
        data.append("content", this.content);
        // FIXME: remove summary property after summary get handle in backend
        data.append("summary", summary);

        data.append("author", user.id);

        // this.$axios
        //   .post("/article", data)
        //   .then(res => {
        //     if (res.status == 201) {
        //       localStorage.removeItem("ongoing-article");
        //       this.$router.push({ path: "/" });
        //     }
        //   })
        //   .catch(err => {
        //     console.log(err.response.data);
        //   });
      }
    }
  }
});
</script>
