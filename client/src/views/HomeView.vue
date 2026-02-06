<template>
  <div>
    <h1 class="text-red">Home</h1>
    {{ data }}
  </div>
</template>
<script>
import { mapState } from 'vuex';


export default {
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