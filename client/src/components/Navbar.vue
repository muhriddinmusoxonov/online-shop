<template>
  <div>
    <nav class="bg-white px-15 py-4 flex justify-between items-center shadow-md">
      <p class="text-orange-500 font-extrabold"><router-link :to="{name: 'home'}">LOGO</router-link></p>
      <ul class="flex justify-between">
        <li class="px-1.5 hover:text-orange-600 cursor-pointer"><a><router-link :to="{name: 'register'}">Register</router-link></a></li>
        <li class="px-1.5 hover:text-orange-600"><a><router-link :to="{name: 'login'}">Login</router-link></a></li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {

}
</script>
<style>

</style>