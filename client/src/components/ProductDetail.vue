<template>
  <Loader v-if="isLoading" />
  <div v-if="product">
    {{ product.name }}
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
    Loader
  }
}
</script>
<style>

</style>