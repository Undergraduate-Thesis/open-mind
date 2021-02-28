<template>
  <div id="validation">
    <!-- Authorization -->
    <div
      v-if="!authorized"
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
          Authorization
        </div>
        <div class="mx-auto px-5 pt-5 pb-10">
          <div class="mb-2">
            <input
              id="password"
              name="password"
              type="password"
              aria-label="Password"
              aria-invalid="true"
              aria-describedby="errorMessage"
              aria-required="true"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="Password"
              v-model="password"
            />
          </div>
          <div v-if="errorMessage != ''" class="px-2 py-2 text-red-500">
            <p class="errorMessage">{{ errorMessage }}</p>
          </div>
          <div class="flex justify-center">
            <button
              @click="authorization"
              class="justify-center px-6 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- FORM -->
    <form id="myForm" @submit.prevent="validation($event)">
      <table class="table-fixed">
        <thead>
          <tr>
            <th class="w-4/6">Article</th>
            <th class="w-1/6">Summary</th>
            <th class="w-1/6">Validation</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sentence, index) in content" :key="index">
            <td class="border-2 border-green-400">{{ sentence }}</td>
            <td
              v-if="summary.includes(index)"
              class="text-center border-2 border-green-400"
            >
              True
            </td>
            <td v-else class="text-center border-2 border-green-400"></td>
            <td
              v-if="summary.includes(index)"
              class="text-center border-2 border-green-400"
            >
              <div class="flex justify-between lg:px-12">
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    :name="index"
                    :id="index"
                    value="True"
                    class="form-radio h-4 w-4 text-indigo-400"
                  /><span class="ml-2 text-gray-700">True</span>
                </label>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    :name="index"
                    :id="index"
                    value="False"
                    class="form-radio h-4 w-4 text-indigo-400"
                  /><span class="ml-2 text-gray-700">False</span>
                </label>
              </div>
            </td>
            <td v-else class="text-center border-2 border-green-400"></td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-center">
        <button
          class="text-white text-center bg-blue-700 w-1/2 py-2 my-4 text-sm font-medium text-left bg-transparent rounded-md inline focus:outline-none"
        >
          Submit Validation
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import Alert from "@/components/Article/alert";
export default {
  components: { Alert },
  data() {
    return {
      title: "",
      content: [],
      summary: [],
      password: "",
      authorized: false,
      errorMessage: ""
    };
  },
  async mounted() {
    const article = await this.$axios.$get(`/article/${this.$route.params.id}`);
    this.title = article.title;
    this.content = this.SplitIntoSentence(article.content);

    const summary = this.SplitIntoSentence(article.summary);
    console.log(summary);

    this.content.forEach((contentSentence, i) => {
      const sentenceWIthoutSpace = contentSentence.replace(" ", "");

      summary.forEach(summarySentence => {
        const summaryWithoutSpace = summarySentence.replace(" ", "");
        if (summaryWithoutSpace == sentenceWIthoutSpace) {
          this.summary.push(i);
        }
      });
    });
  },
  methods: {
    authorization() {
      let data = new FormData();
      data.append("articleId", this.$route.params.id);
      data.append("userId", JSON.parse(localStorage.getItem("user")).id);
      data.append("password", this.password);

      if (this.password == "sejutaumat") {
        this.authorized = true;
      } else {
        this.$axios
          .post(`/article/validation/authorization`, data)
          .then(res => {
            this.authorized = true;
          })
          .catch(err => {
            this.errorMessage = err.response.data;
          });
      }
    },
    SplitIntoSentence(content) {
      const arraySentences = [];
      const sentences = content.split(".");
      sentences.forEach((element, i) => {
        if (i != 0) {
          element;
        }
      });
      for (let i = 0; i < sentences.length; i++) {
        const element = sentences[i];
        if (i != 0) {
          const beforeElement = sentences[i - 1];

          const pattern = new RegExp("[0-9]", "g");
          if (
            beforeElement.substring(beforeElement.length - 1).match(pattern) !=
              null &&
            element.substring(0, 1).match(pattern) != null
          ) {
            arraySentences[arraySentences.length - 1] += "." + element;
          } else if (element != "") {
            arraySentences.push(element);
          }
        } else {
          arraySentences.push(element);
        }
      }
      return arraySentences;
    },
    validation(event) {
      const formData = new FormData(event.target);
      let data = new FormData();
      let validation = [];
      for (var pair of formData.entries()) {
        validation.push({ index: pair[0], value: pair[1] });
      }
      data.append("title", this.title);
      data.append("validation", JSON.stringify(validation));
      this.$axios
        .post(`/article/validation/${this.$route.params.id}`, data)
        .then(res => {
          alert("Thankyou for your validation");
          this.$router.push("/");
        });
    }
  }
};
</script>
