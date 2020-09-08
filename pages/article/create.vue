<template>
  <div class="container">
    <h1>Create Article</h1>
    <form action="POST">
      <input type="text" name="title" id="title" />
      <textarea name="detail" id="detail" cols="30" rows="10"></textarea>
    </form>
  </div>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  mounted() {
    console.log(this.$route.params);
  },
});
</script>