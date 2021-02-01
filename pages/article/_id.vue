<template>
  <div id="article" class="bg-gray-200 px-52 py-8">
    <div class="flex flex-wrap">
      <!--LEFT -->
      <div class="relative md:w-2/12 lg:w-2/12">
        <div class="absolute inset-y-0 right-0 w-32 mr-3 my-40">
          <div class="fixed">
            <button
              aria-label="Like Article"
              :disabled="user == null"
              class="relative w-32 flex justify-end py-2 px-4 mb-2 border-solid border-2 border-black text-sm leading-5 font-medium rounded-md"
              :class="{
                'disabled:opacity-50': user == null,
                'hover:bg-gray-400': user != null,
                'border-gray-600': user == null,
                'text-gray-600': user == null
              }"
              @click.prevent="like()"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0H24V24H0z" />
                  <path
                    v-if="yourLikeId == null"
                    d="M20.243 4.757c2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228 2.349-2.109 5.979-2.039 8.242.228zM5.172 6.172c-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454-1.487-1.49-3.881-1.562-5.453-.186l-4.202 4.203-1.415-1.414 2.825-2.827-.082-.069c-1.575-1.265-3.877-1.157-5.328.295z"
                    :fill="user == null && 'rgba(75, 85, 99, 1)'"
                  />
                  <path
                    v-else
                    d="M20.243 4.757c2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236C5.515 3 8.093 2.56 10.261 3.44L6.343 7.358l1.414 1.415L12 4.53l-.013-.014.014.013c2.349-2.109 5.979-2.039 8.242.228z"
                    fill="rgba(241, 24, 24, 1)"
                  />
                </svg>
              </span>
              Like({{ likes.length }})
            </button>

            <!--  BUTTON SAVE -->
            <button
              aria-label="Save Article"
              :disabled="user == null"
              class="relative w-32 flex justify-end py-2 px-4 mb-2 border-solid border-2 border-black text-sm leading-5 font-medium rounded-md"
              :class="{
                'disabled:opacity-50': user == null,
                'hover:bg-gray-400': user != null,
                'border-gray-600': user == null,
                'text-gray-600': user == null
              }"
              @click.prevent="save()"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />

                  <path
                    v-if="yourBookmarkId != null"
                    d="M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.766.424L12 18.03l-7.234 4.536A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1z"
                  />
                  <path
                    v-else
                    d="M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.766.424L12 18.03l-7.234 4.536A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1zm13 2H6v15.432l6-3.761 6 3.761V4z"
                    :fill="user == null && 'rgba(75, 85, 99, 1)'"
                  />
                </svg>
              </span>
              Save
            </button>

            <!-- BUTTON DOWNLOAD  -->
            <button
              aria-label="Download Article"
              class="relative w-32 flex justify-end py-2 px-4 mb-2 border-solid border-2 border-black text-sm leading-5 font-medium rounded-md hover:bg-gray-400"
              @click.prevent="download()"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M13 12h3l-4 4-4-4h3V8h2v4zm2-8H5v16h14V8h-4V4zM3 2.992C3 2.444 3.447 2 3.999 2H16l5 5v13.993A1 1 0 0 1 20.007 22H3.993A1 1 0 0 1 3 21.008V2.992z"
                  />
                </svg>
              </span>
              Download
            </button>
          </div>
        </div>
      </div>
      <!--RIGHT -->
      <!-- Detail Article -->
      <div class="w-full md:w-8/12 lg:w-8/12">
        <div class="bg-white mb-6 rounded-lg">
          <div class="article__image">
            <img
              v-if="thumbnail != ''"
              class="object-cover w-full h-64 rounded-t-lg"
              :src="thumbnail"
              alt="article image"
            />
            <img
              v-else
              class="object-cover w-full h-64 rounded-t-lg"
              src="https://images.unsplash.com/photo-1587814969489-e5df12e17391?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8c29jaWFsJTIwZGlzdGFuY2UlMjBhbmQlMjBzdGF5JTIwc2FmZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="article image"
            />
          </div>

          <div class="px-12 py-10">
            <div class="flex justify-between">
              <div class="article__tag relative">
                <span
                  v-for="(tag, index) in tags"
                  :key="index"
                  class="absloute bottom-0 bg-indigo-600 mr-2 px-2 py-1 text-white rounded-md"
                  >{{ tag.name }}
                </span>
              </div>
              <button
                class="bg-gray-900 text-gray-100 px-5 py-2 font-semibold rounded"
                @click="summary = !summary"
              >
                <p v-if="summary == false">Generate Summary</p>
                <p v-else>Get Full Text</p>
              </button>
            </div>

            <div class="article__title mb-2">
              <h1 class="text-4xl font-bold">{{ article.title }}</h1>
            </div>
            <div class="article__author mb-6">
              <p class="text-lg">
                {{ article.author }} ({{ article.created_at }})
              </p>
            </div>
            <div class="article__content h-full text-xl" v-show="!summary">
              <div v-html="article.content"></div>
            </div>
            <div class="article__summary h-full text-xl" v-show="summary">
              <div v-html="article.summary"></div>
            </div>
          </div>
        </div>

        <!-- Comments -->
        <div class="bg-white mb-6 rounded-lg">
          <div class="comments__title px-6 py-6 bg-gray-300 rounded-t-lg">
            <h3>Comments</h3>
          </div>

          <div class="px-12 py-10">
            <textarea
              placeholder="Type your comment here"
              class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              rows="2"
              v-model="comment"
              :disabled="user == null"
            ></textarea>
            <div class="relative w-full mb-6 h-4">
              <div class="absolute inset-y-0 right-0 w-16 ...">
                <button
                  v-if="comment == ''"
                  class="opacity-25 bg-gray-900 text-gray-100 px-3 py-1 font-semibold text-sm rounded"
                  disabled
                >
                  Submit
                </button>
                <button
                  v-else
                  class="bg-gray-900 text-gray-100 px-3 py-1 font-semibold text-sm rounded"
                  @click="addComment"
                >
                  Submit
                </button>
              </div>
            </div>

            <div class="ml-6">
              <singleComment
                v-for="comment in comments"
                :key="comment._id"
                :comment="comment"
                @deleteComment="deleteComment(comment._id)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="article__comment"></div>
  </div>
</template>
<script>
import { jsPDF } from "jspdf";
import singleComment from "@/components/Card/Single-Comment";
export default {
  layout: "container",
  components: {
    singleComment
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      thumbnail: "",
      article: {},
      summary: false,
      tags: [],
      likes: [],
      yourLikeId: null,
      yourBookmarkId: null,
      comments: [],
      comment: ""
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

      // Get Tags
      const tags = await this.$axios.$get(`/tag/${this.$route.params.id}`);
      this.tags = tags;

      // Get Likes
      const likes = await this.$axios.$get(
        `/article/like/${this.$route.params.id}`
      );
      this.likes = likes;
      this.likes.forEach(element => {
        if (element.user_id == this.user.id) {
          this.yourLikeId = element._id;
        }
      });

      // Get Comments
      const comments = await this.$axios.$get(
        `/article/comment/${this.$route.params.id}`
      );
      this.comments = comments;

      // Get Bookmark
      if (this.user != null) {
        const bookmark = await this.$axios.$get(
          `/user/singleBookmark/${this.user.id}/${this.$route.params.id}`
        );
        if (bookmark != "") {
          this.yourBookmarkId = bookmark;
        }
      }

      // Get Thumbnail
      if (article.thumbnail != null) {
        let thumbnailName = article.thumbnail.fieldname;
        const thumbnailType = article.thumbnail.mimetype.replace("image/", "");
        const getThumbnail = await this.$axios.$get(
          `/article/thumbnail/${thumbnailName}.${thumbnailType}`
        );
        const b64encoded = Buffer.from(getThumbnail.Body.data).toString(
          "base64"
        );
        this.thumbnail = "data:image/jpg;base64," + b64encoded;
      }

      // Date
      const date = new Date(article.created_at);
      // alert(date);
    } catch (error) {
      console.log("error", error);
    }
  },
  methods: {
    download() {
      // Default export is a4 paper, portrait, using millimeters for units
      const doc = new jsPDF({
        orientation: "p",
        unit: "in",
        format: [8.3, 11.7]
      });
      const pageWidth = 8.3;
      const ptsPerInch = 72;
      const margin = 0.7;
      const maxLineWidth = pageWidth - margin * 2;

      let bottomPositionText = 1.2;

      //Title
      const fontSizeTitle = 30;
      let oneLineHeight = fontSizeTitle / ptsPerInch;

      let textLines = doc
        .setFont("helvetica")
        .setFontSize(fontSizeTitle)
        .splitTextToSize(this.article.title, maxLineWidth);

      doc.text(textLines, margin, bottomPositionText);

      bottomPositionText += textLines.length * oneLineHeight;

      //Author
      const fontSizeAuthor = 12;
      oneLineHeight = fontSizeAuthor / ptsPerInch;

      textLines = doc
        .setFont("helvetica")
        .setFontSize(fontSizeAuthor)
        .splitTextToSize(
          this.article.author + " " + this.article.created_at,
          maxLineWidth
        );

      doc.text(textLines, margin, bottomPositionText);

      // 1 is extend whitespace to make clearly distance between title and content
      bottomPositionText += textLines.length * oneLineHeight + 0.5;
      ``;

      //Content
      let content = this.article.content.replace(/<p[^>]*>/g, "");
      content = content.replace(/<\/p[^>]*>/g, "\n");
      const fontSizeContent = 12;
      oneLineHeight = fontSizeContent / ptsPerInch;

      textLines = doc
        .setFont("helvetica")
        .setFontSize(fontSizeContent)
        .splitTextToSize(content, maxLineWidth);

      textLines.forEach(value => {
        doc.text(value, margin, bottomPositionText);

        //0.08 because the vertical distance is too tight.
        bottomPositionText += oneLineHeight + 0.08;

        const bottomMaxPosition = 11.7 - 1.2;

        if (bottomPositionText + oneLineHeight > bottomMaxPosition) {
          doc.addPage();
          bottomPositionText = 1.2;
        }
      });

      // //Download
      doc.save("article.pdf");
    },
    addComment() {
      this.$axios
        .$post(`/article/comment/${this.$route.params.id}`, {
          userId: this.user.id,
          comment: this.comment
        })
        .then(res => {
          this.comments.push(res);
        });
    },
    deleteComment(commentId) {
      this.$axios.$delete(`/article/comment/${commentId}`).then(res => {
        this.comments = this.comments.filter(
          comment => comment._id != commentId
        );
      });
    },
    like() {
      if (this.yourLikeId == null) {
        this.$axios
          .$post(`/article/like/${this.user.id}`, {
            articleId: this.article._id
          })
          .then(res => {
            this.yourLikeId = res._id;
            this.likes.push(res);
          });
      } else {
        this.$axios.$delete(`/article/like/${this.yourLikeId}`).then(res => {
          //remove object from array with condition
          this.likes = this.likes.filter(like => like._id !== this.yourLikeId);
          //set null
          this.yourLikeId = null;
        });
      }
    },
    async save() {
      if (this.yourBookmarkId == null) {
        this.yourBookmarkId = await this.$axios.$post(
          `/user/bookmark/${this.$route.params.id}`,
          {
            userId: this.user.id
          }
        );
      } else {
        this.$axios
          .$delete(`/user/bookmark/${this.yourBookmarkId._id}`)
          .then(res => {
            this.yourBookmarkId = null;
          });
      }
    }
  }
};
</script>
