<template>
  <div>
    <h4>Validation Errors</h4>
  </div>
</template>
<script>
export default {
    props: {
      validationErrors: {
        type: Object,
        required: true
      }
  },
  updated() {
    console.log(this.validationErrors);

  }
}
</script>
<style>

</style>