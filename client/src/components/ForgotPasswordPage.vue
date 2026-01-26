<script>
import Button from '@/ui-components/Button.vue';
import Input from '@/ui-components/Input.vue';
import ValidationErrors from './ValidationErrors.vue';

export default {

  data() {
    return {
      email: ''
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
    ValidationErrors
  },

methods: {
    submitHandler(e) {
      e.preventDefault()
      const email = {
        email: this.email,
      }
      this.$store.dispatch('forgotPassword', {...email}).then(data => {console.log("Data", data), this.$router.push('/check-code/forgot-password')
      }).catch(error => {console.log("ERROR", error)
      }) //user -> payload deb ataladi.
    }
  }

}

</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-29 lg:px-8">
    <div class=" mx-auto sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="ml-8">
        <h2 class="mt-10 text-center text-3xl font-bold tracking-tight text-orange-600">Reset Password</h2>
      </div>
    </div>

    <div class="mt-17 flex justify-center items-center sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <ValidationErrors v-if="validationErrors" :validationErrors="validationErrors" />
        <Input i-class="fa-solid fa-envelope inline text-orange-600 text-2xl mx-2" id="forgotPEmail" v-model="email" type="email" placeholder="Gmail Address..."/>
        <div class="ml-10">
          <div class="w-80 mx-auto">
          <Button type="submit" @click="submitHandler" :disable="isLoading">Send</Button>
        </div>
        </div>
      </form>
    </div>
  </div>
</template>