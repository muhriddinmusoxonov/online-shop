<template>
  <div class="mt-2 flex justify-center items-center">
            <i :class="iClass"></i>
            <input :type="type" :id="id" required class="w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-orange-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" @input="updateInput" :value="modelValue" :placeholder="placeholder" />
        </div>
</template>
<script>
export default {
  name: 'Input',
  props: {
    type: String,
    placeholder: String,
    iClass: String,
    id: String,
    modelValue: [String, Number]
  },

  methods: {
    updateInput(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>
<style>

</style>