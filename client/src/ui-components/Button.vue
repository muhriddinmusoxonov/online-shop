<template>
  <div class="w-80 mx-auto">
    <button :disabled="disabled" class="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"><slot></slot></button>
          </div>
</template>
<script>
export default {
  name: 'Button',
  props: {
    disabled: Boolean
  }
}
</script>
<style>

</style>