<template>
  <!-- post card -->
  <div class="flex bg-white shadow-lg rounded-lg w-full mb-2 border-2">
    <!--horizantil margin is just for display-->
    <div class="flex w-full items-start px-4 py-6">
      <img
        class="w-12 h-12 rounded-full object-cover mr-4 shadow"
        :src="comment.photo.link"
        alt="avatar"
      />
      <div class="w-full">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900 -mt-1">
            {{ comment.userName }}
          </h2>
          <button
            v-if="user != null && user.id == comment.userId"
            class="bg-red-700 text-gray-100 px-3 py-1 font-semibold text-sm rounded"
            @click="deleteComment"
          >
            Delete
          </button>
        </div>
        <p class="text-gray-700">{{ comment.created_at }}</p>
        <p class="mt-3 text-gray-700 text-sm">
          {{ comment.comment }}
        </p>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
export default {
  props: {
    comment: {}
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user"))
    };
  },
  mounted() {
    const created_at = new Date(this.comment.created_at);
    this.comment.created_at = `${created_at.getDate()} ${created_at.toLocaleString(
      "default",
      { month: "short" }
    )} ${created_at.getFullYear()} ${created_at.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })}`;
  },
  methods: {
    deleteComment() {
      this.$emit("deleteComment");
    }
  }
};
</script>
