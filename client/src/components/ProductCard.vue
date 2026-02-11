<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },

  methods: {
    getProductDetail() {
      this.$router.push(`/product/${this.product.slug}`)
    }
  }
}
</script>

<template>
  <div
    class="group bg-white border border-orange-300 rounded-2xl
           p-3 hover:border-orange-500 transition"
  >
    <!-- Image -->
    <div class="aspect-square rounded-xl overflow-hidden bg-gray-50">
      <img
        :src="product.image_url[0]"
        alt=""
        class="w-full h-full object-cover group-hover:scale-105 transition"
      />
    </div>

    <!-- Info -->
    <div class="mt-3 flex items-start justify-between gap-2">
      <h3
        class="text-sm font-medium text-gray-800 line-clamp-2"
      >
        {{ product.name }}
      </h3>
    </div>
    <div class="flex justify-between mt-3">
      <button class="px-3 py-1 bg-orange-400 text-sm text-white text rounded-md hover:bg-orange-500 transition hover:scale-105" @click="getProductDetail">More Info...</button>
      <span class="text-sm mt-1 font-normal text-gray-500 whitespace-nowrap">
        {{ product.price }}$
      </span>
    </div>
  </div>
</template>
