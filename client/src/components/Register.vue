<script>
import Button from '@/ui-components/Button.vue';
import Input from '@/ui-components/Input.vue';

export default {
  computed: {
    isLoading() {
      return this.$store.state.auth.isLoading
    }
  },
  methods: {
    submitHandler(e) {
      e.preventDefault()
      const user = {
        full_name: "Muhriddin Musoxonov",
        email: "muhriddinmusoxonov@gmail.com",
        password: "mypassword",
        phone: 998976828683
      }
      this.$store.dispatch('register', {...user}).then(data => {console.log("Data", data)
      }).catch(error => {console.log("ERROR", error)
      }) //user -> payload deb ataladi.
    }
  }
}

</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="ml-7.5">
        <h2 class="mt-10 text-center text-3xl font-bold tracking-tight text-orange-600">Register Form</h2>
      </div>
    </div>

    <div class="mt-10 flex justify-center items-center sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">

        <Input i-class="fa-solid fa-user inline text-orange-600 text-2xl mx-2" type="string" placeholder="Full Name..."/>

        <Input i-class="fa-solid fa-envelope inline text-orange-600 text-2xl mx-2" type="string" placeholder="Gmail Address..." />

        <Input i-class="fa-solid fa-phone inline text-orange-600 text-2xl mx-2" type="string" placeholder="Phone Number..." />

        <Input i-class="fa-solid fa-key inline text-orange-600 text-2xl mx-2" type="string" placeholder="Password..." />


        <div class="ml-10">
          <Button type="submit" @click="submitHandler" :disabled="isLoading">Register</Button>
          <p class="mt-10 text-center text-sm/6 text-gray-400">
            Not a member?
            {{ ' ' }}
            <a href="#" class="font-semibold text-orange-600 hover:text-indigo-300">Start a 14 day free trial</a>
          </p>
        </div>
      </form>

    </div>
  </div>
</template>