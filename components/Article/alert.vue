<template>
  <div
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
        Caution
      </div>
      <div class="mx-auto px-5 pt-5 pb-10">
        <div class="w-full mb-10">
          <p class="text-sm text-gray-600 px-5 mb-2">
            Artikel anda tidak dapat di publish. Pastikan anda telah memenuhi
            syarat berikut sebelum melakukan publikasi :
          </p>
          <ul class="text-sm text-teal-500">
            <li>Title tidak boleh kosong</li>
            <li>Content tidak boleh kosong</li>
            <li>Tag yang digunakan harus terkandung dalam Content artikel.</li>
          </ul>
        </div>
        <!-- <div class="flex"> -->
        <div class="flex justify-center">
          <button
            @click="$emit('closeAlert')"
            class="justify-center px-6 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
          >
            Oke
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
@import url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);
</style>
