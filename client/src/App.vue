<template>
  <div>
    <Navbar/>
    <!-- <h1 class="font-bold">Hello mac</h1> -->
  </div>
  <RouterView />
</template>
<script>
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';

export default {
  components: {Navbar}
}
</script>
<style>

</style>