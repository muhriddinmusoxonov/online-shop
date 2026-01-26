<script>
import Button from '@/ui-components/Button.vue';
import Input from '@/ui-components/Input.vue';
import ValidationErrors from './ValidationErrors.vue';

export default {

  data() {
    return {
      newPassword: '',
      confirmPassword: ''
    }
  },

  computed: {
    isLoading() {
      return this.$store.state.auth.isLoading;
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
      e.preventDefault();
      const email = localStorage.getItem('email')
      const data = {
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
        email: email
      }
      console.log({...data});

      this.$store.dispatch('resetCode', {...data}).then(data => {console.log("Data", data), this.$router.push({name: 'login'});
      }).catch(error => {console.log("ERROR", error);
      })
    }
  }
}

</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-29 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-3xl font-bold tracking-tight text-orange-600">Reset Code</h2>
    </div>

    <div class="mt-15 flex justify-center items-center sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <ValidationErrors v-if="validationErrors" :validation-errors="validationErrors" />
        <Input i-class="fa-solid fa-key inline text-orange-600 text-2xl mx-2" id="newPassword" v-model="newPassword" type="password" placeholder="New Password..."/>

        <Input i-class="fa-solid fa-key inline text-orange-600 text-2xl mx-2" id="confirmPassword" v-model="confirmPassword" type="password" placeholder="Confirm Password..."/>

        <div class="ml-10">
          <div class="w-80 mx-auto">
            <Button type="submit" @click="submitHandler">Reset</Button>
          </div>
       </div>
      </form>
    </div>
  </div>
</template>