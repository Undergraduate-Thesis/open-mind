<template>
  <div class="container">
    <div>
      <router-link
        to="/Article/create"
        tag="button"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >Create Article</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  mounted() {
    this.$myInjectedFunction("works in mounted");
  },
});
</script>
