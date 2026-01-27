<template>
  <div>
    <nav class="bg-white px-15 py-4 flex justify-between items-center shadow-md">
      <p class="text-orange-500 font-extrabold"><router-link :to="{name: 'home'}">LOGO</router-link></p>
      <template v-if="isLoggedIn">
        {{ user.full_name }}
      </template>
      <template v-if="!isLoggedIn">
        <ul class="flex justify-between">
        <li class="px-1.5 hover:text-orange-600 cursor-pointer"><a><router-link :to="{name: 'register'}">Register</router-link></a></li>
        <li class="px-1.5 hover:text-orange-600"><a><router-link :to="{name: 'login'}">Login</router-link></a></li>
      </ul>
      </template>
    </nav>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      user: state => state.auth.user,
      isLoggedIn: state => state.auth.isLoggedIn
    })
  }
}
</script>
<style>

</style>