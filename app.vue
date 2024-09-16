<template>
  <div>
    <OrganismsHeader />
    <div class="container mx-auto w-3/4 my-8">
      <div class="flex items-center gap-6 mb-6">
        <!-- 場風 -->
        <div class="flex items-center">
          <select id="countries" class="w-16 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="east" selected>東</option>
            <option value="south">南</option>
            <option value="west">西</option>
            <option value="north">北</option>
          </select>
          <label class="ml-2">場</label>
        </div>
        <!-- 本場 -->
        <div class="flex items-center">
          <input type="number" id="number-input" aria-describedby="helper-text-explanation" class="w-16 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />

          <label class="w-full ml-2">本場</label>
        </div>
        <!-- 自風 -->
        <div class="flex items-center">
          <select id="countries" class="w-16 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="east" selected>東</option>
            <option value="south">南</option>
            <option value="west">西</option>
            <option value="north">北</option>
          </select>
          <label class="ml-2">家</label>
        </div>
      </div>
      <!-- 手牌 -->
      <div class="border w-full h-36 border-gray-400 rounded-md mb-6">
      </div>
      <!-- 鳴き -->
      <div class="mb-6">
      </div>
      <div class="flex gap-4">
        <div class="border h-36 border-gray-400 w-3/6"></div>
        <div class="border h-36 border-gray-400 w-3/6"></div>
      </div>
    </div>
  </div>
</template>
