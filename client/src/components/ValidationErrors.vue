<template>
  <div
    class="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-700"
  >
    <ul class="list-disc pl-5 space-y-1">
      <li
        class="text-sm"
        v-for="(errorMessage, index) in validationErrors"
        :key="index"
      >
        {{ errorMessage }}
      </li>
    </ul>
  </div>
</template>


<script>
export default {
    props: {
      validationErrors: {
        type: Array,
        required: true
      }
  },
}
</script>
<style>

</style>