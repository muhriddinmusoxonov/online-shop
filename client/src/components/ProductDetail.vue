<template>
  <Loader v-if="isLoading" />
  <div v-if="product">
    <h2 class="text-center text-orange-500 text-5xl my-15 font-bold">{{ product.name }}</h2>
    <div class="max-w-200 h-100 flex rounded-xl overflow-hidden ml-80 mt-40">
      <div class="w-1/2">
        <img
          :src="product.image_url[0]"
          class="w-full h-full object-cover"
          alt=""
          >
      </div>

      <div class="w-1/2 px-6 py-6 flex flex-col">
        <h3 class="text-xl font-bold">
          Description:
        </h3>

        <p class="flex-1 flex items-center text-gray-700">
          {{ product.description }}
        </p>

        <div class="mt-auto flex justify-between items-center">
          <button class="px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-400 cursor-pointer">
            Add To Cart
          </button>

          <p class="text-lg font-semibold">
            {{ product.price }}$
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loader from '@/ui-components/Loader.vue';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      product: state => state.products.productDetail,
      isLoading: state => state.products.isLoading
    })
  },
  components: {
    Loader,
  }
}
</script>
<style>

</style>