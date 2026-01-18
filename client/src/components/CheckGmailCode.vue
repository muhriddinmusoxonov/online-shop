<script>
import Button from '@/ui-components/Button.vue';
import Input from '@/ui-components/Input.vue';

export default {
  data() {
    return {
      code: ''
    }
  },

  computed: {
    isLoading() {
      return this.$store.state.auth.isLoading
    }
  },

  methods: {
    submitHandler(e) {
      e.preventDefault()
      const code = {
        code: Number(this.code),
      }
      this.$store.dispatch('checkRegisterCode', {...code}).then(data => {console.log("Data", data), this.$router.push({name: 'login'})
      }).catch(error => {console.log("ERROR", error)
      }) //user -> payload deb ataladi.
    }
  }
}

</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-29 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-3xl font-bold tracking-tight text-orange-600">Check Code</h2>
    </div>

    <div class="mt-17 flex justify-center items-center sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">

        <Input i-class="fa-solid fa-key inline text-orange-600 text-2xl mx-2" id="yourCode" type="text" v-model="code" placeholder="Your code..."/>

        <div class="ml-10">
          <div class="w-80 mx-auto">
           <Button type="submit" @click="submitHandler" :disabled="isLoading">Send</Button>
        </div>
        </div>
      </form>

    </div>
  </div>
</template>