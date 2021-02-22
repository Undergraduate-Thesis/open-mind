<template>
  <table class="table-fixed">
    <thead>
      <tr>
        <th class="w-2/6 border-2 border-green-400">Title Article</th>
        <th class="w-1/6 border-2 border-green-400">True</th>
        <th class="w-1/6 border-2 border-green-400">False</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="validation in validations" :key="validation._id">
        <td class="border-2 border-green-400">{{ validation.title }}</td>
        <td class="text-center border-2 border-green-400">
          {{ validation.true }}
        </td>
        <td class="text-center border-2 border-green-400">
          {{ validation.false }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  data() {
    return {
      validations: []
    };
  },
  async mounted() {
    const validations = await this.$axios.$get(`/article/validation/report`);
    validations.forEach(element => {
      let totalTrue = 0;
      let totalFalse = 0;
      element.validation.forEach(childElement => {
        if (childElement.value == "True") {
          totalTrue += 1;
        } else {
          totalFalse += 1;
        }
      });
      this.validations.push({
        title: element.title,
        true: totalTrue,
        false: totalFalse
      });
    });
  }
};
</script>
