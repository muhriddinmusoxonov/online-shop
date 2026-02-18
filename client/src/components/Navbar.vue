<template>
  <div>
    <nav class="bg-white px-15 py-4 flex justify-between items-center shadow-md">
      <p class="text-orange-500 font-extrabold"><router-link :to="{name: 'home'}">LOGO</router-link></p>
      <template v-if="isLoggedIn">
        <div class="flex justify-between">
          <div class="px-1.5">
            {{ currentUser.full_name }}
          </div>
          <ul>
            <li class="px-2 hover:text-orange-600 cursor-pointer"><a><router-link :to="{name: 'createProduct'}">CreateProduct</router-link></a></li>
          </ul>
          <a href="#" @click="logout" class="px-5 cursor-pointer"><i class="fa-solid fa-arrow-right-from-bracket" style="color: rgb(255, 0, 0);"></i></a>
        </div>
      </template>
      <template v-if="isAnonymous">
        <ul class="flex justify-between">
        <li class="px-1.5 hover:text-orange-600 cursor-pointer"><a><router-link :to="{name: 'register'}">Register</router-link></a></li>
        <li class="px-1.5 hover:text-orange-600"><a><router-link :to="{name: 'login'}">Login</router-link></a></li>
      </ul>
      </template>
    </nav>
  </div>
</template>
<script>
import { getterTypes } from '@/modules/types';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      currentUser: getterTypes.currentUser,
      isLoggedIn: getterTypes.isLoggedIn,
      isAnonymous: getterTypes.isAnonymous
    })
  },

  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>
<style>

</style>