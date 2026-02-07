<template>
  <div class="bg-white">
        <div class="group relative">
          <div class="">
            <img :src="product.image_url[0]" class="aspect-square w-full object-cover group-hover:border border-orange-400 rounded-2xl p-4 lg:aspect-auto lg:h-80" />
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <a :href="product.href">
                  <span aria-hidden="true" class="absolute inset-0"></span>
                  {{ product.name }}
                </a>
              </h3>
              <!-- <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p> -->
            </div>
            <p class="text-sm font-medium text-gray-900">{{ product.price }}</p>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
        required: true
      }
    }
  }
</script>