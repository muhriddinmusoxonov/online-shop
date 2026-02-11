
<script>
import ProductDetail from '@/components/ProductDetail.vue';

export default {
  components:{ProductDetail},
  mounted() {
    this.$store.dispatch('getProductDetail', this.$route.params.slug)
  }
}
</script>
<template>
  <div>
    <ProductDetail />
  </div>
</template>