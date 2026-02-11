<script>
import Button from '@/ui-components/Button.vue';
import Input from '@/ui-components/Input.vue';
import ValidationErrors from './ValidationErrors.vue';

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },

  computed: {
    isLoading() {
      return this.$store.state.auth.isLoading
    },

    validationErrors() {
      return this.$store.state.auth.error
    }
  },

   components: {
     ValidationErrors,
  },

  methods: {
    submitHandler(e) {
      e.preventDefault()
      const user = {
        email: this.email,
        password: this.password,
      }
      this.$store.dispatch('login', {...user}).then(data => {console.log("Data", data), this.$router.push({name: 'home'})
      }).catch(error => {console.log("ERROR", error)
      }) //user -> payload deb ataladi.
    }
  }
}

</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-29 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-3xl font-bold tracking-tight text-orange-600">Login</h2>
    </div>

    <div class="mt-10 flex justify-center items-center sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <ValidationErrors v-if="validationErrors" :validationErrors="validationErrors" />
        <Input i-class="fa-solid fa-envelope inline text-orange-600 text-2xl mx-2" id="gmailAddress" v-model="email" type="string" placeholder="Gmail Address..." />

        <Input i-class="fa-solid fa-key inline text-orange-600 text-2xl mx-2" id="password" v-model="password" type="password" placeholder="Password..." />
          <div class="text-sm flex justify-end items-center mt-3">
              <router-link :to="{name: 'forgotPassword'}"><a href="#" class="font-semibold text-orange-600 hover:text-orange-400">Forgot password?</a></router-link>
          </div>

        <div class="ml-10">
          <Button type="submit" @click="submitHandler" :disabled="isLoading">Login</Button>
        </div>
        <p class="mt-10 text-center text-sm/6 text-gray-400 ml-10 block">
          Not a member?
          {{ ' ' }}
          <a href="#" class="font-semibold text-orange-600 hover:text-indigo-300">Start a 14 day free trial</a>
        </p>
      </form>

    </div>
  </div>
</template>