
<script>
export default {
  mounted() {
    this.$store.dispatch('getProductDetail', this.$route.params.slug)
  }
}
</script>
<template>
  <div>
    <h1 class="text-center text-5xl">Product Detail</h1>
  </div>
</template>