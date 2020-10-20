<template>
  <div
    class="my-3 h-56 lg:flex lg:justify-center border border-gray-300 shadow rounded-md"
  >
    <div class="lg:w-2/5">
      <div
        class="bg-gray-400 lg:rounded-lg lg:h-full animate-pulse"
        @click="openArticle()"
      ></div>
    </div>
    <div class="py-10 px-6 max-w-xl lg:max-w-5xl lg:w-3/5">
      <div class="animate-pulse flex space-x-4">
        <div class="flex-1 space-y-6">
          <div class="h-6 bg-gray-400 rounded-lg w-3/4"></div>
          <div class="space-y-2">
            <div class="h-3 bg-gray-400 rounded-lg"></div>
            <div class="h-3 bg-gray-400 rounded-lg w-5/6"></div>
          </div>
          <div class="flex items-center justify-between py-3 space-y-2">
            <div class="block w-4/5">
              <div class="h-3 bg-gray-400 rounded-lg w-1/4 inline-block"></div>
              <div class="h-3 bg-gray-400 rounded-lg w-1/4 inline-block"></div>
            </div>
            <div class="block w-1/5">
              <div class="h-3 bg-gray-400 rounded-lg w-full inline-block"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
