<template>
  <div>
    <!-- <h1 class="text-red">Home</h1> -->
    <!-- {{ data }} -->
    <Loader v-if="isLoading" />
      <div v-else class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <ProductCard v-for="product in data" :product="product" :key="product.slug"/>
      </div>
      </div>
  </div>
</template>
<script>
import ProductCard from '@/components/ProductCard.vue';
import Loader from '@/ui-components/Loader.vue';
import { mapState } from 'vuex';


export default {

  components: {
    ProductCard,
    Loader
  },

  computed: {
    ...mapState({
      data: state => state.products.data,
      isLoading: state => state.products.isLoading,
      error: state => state.products.error
    })
  },

  mounted() {
    this.$store.dispatch('getProducts')
  }
}
</script>
<style>

</style>