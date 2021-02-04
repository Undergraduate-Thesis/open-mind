<template>
  <div class="update__profile">
    <div
      class="min-h-screen flex justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-md w-full">
        <div>
          <img
            class="w-40 h-40 mx-auto rounded-full object-cover shadow"
            :src="photoPreview"
            alt="avatar"
          />
          <h2
            class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900"
          >
            Update Profile
          </h2>
        </div>
        <div class="w-full max-w-xl mt-8 bg-white rounded-lg shadow-md">
          <form
            class="p-6"
            action="#"
            method="POST"
            @submit.prevent="updateProfile()"
          >
            <input type="hidden" name="remember" value="true" />
            <div class="rounded-md shadow-sm">
              <div class="mb-6">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="name"
                  >name</label
                >
                <input
                  name="name"
                  type="text"
                  aria-label="name"
                  aria-invalid="true"
                  aria-describedby="errorMessage"
                  aria-required="true"
                  required
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  placeholder="Name"
                  v-model="name"
                />
              </div>
              <div class="mb-6">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="Photo"
                  >Photo</label
                >
                <input
                  id="browseFile"
                  type="file"
                  name="text"
                  value="text"
                  accept="image/jpeg, image/png"
                  @change="changePhoto($event)"
                  hidden
                />
                <button
                  type="button"
                  @click="openFile"
                  class="w-full inline-flex py-2 px-6 justify-center border border-teal-500 text-teal-500 rounded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M4.828 21l-.02.02-.021-.02H2.992A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H4.828zM20 15V5H4v14L14 9l6 6zm0 2.828l-6-6L6.828 19H20v-1.172zM8 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                      fill="rgb(134,188,195,1)"
                    />
                  </svg>
                  <span class="ml-2">Change Photo</span>
                </button>
              </div>
              <div class="mb-6">
                <div
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  <label for="change password">Want to change password?</label>
                  <input
                    type="checkbox"
                    name="change password"
                    id="changePassword"
                    @click="changePassword = !changePassword"
                  />
                </div>

                <input
                  name="password"
                  type="password"
                  aria-label="Password"
                  aria-invalid="true"
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  placeholder="Password"
                  v-model="password"
                  @change="changePhoto($event)"
                  :disabled="!changePassword"
                />
              </div>
            </div>

            <div class="mt-6">
              <button
                aria-label="Update Profile"
                class="group relative w-full flex bg-gray-900 text-white justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md"
                type="submit"
              >
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    class="h-5 w-5 group-hover:text-indigo-400 transition ease-in-out duration-150"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  layout: "container",
  data() {
    return {
      name: "",
      password: "",
      photo: null,
      photoPreview: "",
      changePassword: false
    };
  },
  mounted() {
    const { name, photo } = JSON.parse(localStorage.getItem("user"));
    this.name = name;
    this.photoPreview = photo.link;
  },
  methods: {
    openFile() {
      const button = document.querySelector("#browseFile");
      button.click();
    },
    changePhoto(event) {
      const file = event.target.files[0];
      this.photo = file;

      // Change file to url for preview into img tag
      const reader = new FileReader();
      reader.onload = e => {
        this.photoPreview = reader.result;
      };
      reader.readAsDataURL(file);
    },
    async updateProfile() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        let data = new FormData();

        data.append("name", this.name);
        if (this.password != "") {
          data.append("password", this.password);
        }
        if (this.photo != null) {
          data.append("file", this.photo);
        }

        const updateProfile = await this.$axios.put(
          `/user/updateProfile/${user.id}`,
          data
        );

        if (updateProfile) {
          this.$router.push("/profile");
        }
        user.name = updateProfile.data.name;
        user.photo = updateProfile.data.photo;
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
        this.errorMessage = error.response.data;
      }
    }
  }
});
</script>
