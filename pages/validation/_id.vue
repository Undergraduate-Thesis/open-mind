<template>
  <div id="validation">
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
          Submit Bosque
        </button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      content: [],
      summary: []
    };
  },
  async mounted() {
    const article = await this.$axios.$get(`/article/${this.$route.params.id}`);
    this.title = article.title;
    this.content = this.SplitIntoSentence(article.content);

    const summary = article.summary.split(".");

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
          alert("Tahnkyou Bosque");
          this.$router.push("/");
        });
    }
  }
};
</script>
