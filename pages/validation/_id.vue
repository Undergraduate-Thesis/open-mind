<template>
  <div id="validation">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: [],
      summary: []
    };
  },
  async mounted() {
    const article = await this.$axios.$get(`/article/${this.$route.params.id}`);
    this.content = article.content.split(".");

    const summary = article.summary.split(".");
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
  }
};
</script>
