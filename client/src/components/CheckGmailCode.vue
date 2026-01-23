<script>
import Button from '@/ui-components/Button.vue';
import Input from '@/ui-components/Input.vue';
import ValidationErrors from './ValidationErrors.vue';

export default {
  data() {
    return {
      code: '',
      timeLeft: 60,
      timer: null
    }
  },

  mounted() {
    this.startTimer()
  },

   beforeUnmount() {
    clearInterval(this.timer)
  },

  components: {
    ValidationErrors
  },

  computed: {
    isLoading() {
      return this.$store.state.auth.isLoading
    },
    validationErrors() {
      return this.$store.state.auth.error
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
    },



     startTimer() {
      this.timeLeft = 60

      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--
        } else {
          clearInterval(this.timer)
        }
      }, 1000)
    },

    resendCode() {
      // backendga resend so‘rov
      const email = localStorage.getItem('email')
      this.$store.dispatch('resendCode', {email}).then(data => {console.log("Data", data)
      }).catch(error => {console.log("ERROR", error)
      })

      // timerni qayta boshlash
      this.startTimer()
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
         <ValidationErrors v-if="validationErrors" :validationErrors="validationErrors" />

        <Input i-class="fa-solid fa-key inline text-orange-600 text-2xl mx-2" id="yourCode" type="text" v-model="code" placeholder="Your code..."/>

      <div class="mt-3 text-center">
            <p v-if="timeLeft > 0" class="text-gray-500">
              Resend code in <b>{{ timeLeft }}</b> seconds
            </p>

            <button
              v-else
              @click="resendCode"
              class="text-orange-600 font-semibold hover:underline"
            >
              Resend code
            </button>
      </div>

        <div class="ml-10">
          <div class="w-80 mx-auto">
           <Button type="submit" @click="submitHandler" :disabled="isLoading">Send</Button>
        </div>
        </div>
      </form>

    </div>
  </div>
</template>


<!--
1. Timer qo'yiladi 60 dan boshlab kamayish tartibida ishlaydi.
2. Timer 0 bo'lgach button disabled bo'ladi.
3. Code ni qayta jo'natish uchun button qo'yiladi va unga code ni qayta jo'natuvchi funcktion biriktiriladi.
4. Code ni qayta jo'natish funksiyasi ishlagandan so'ng sekundnamer reset bo'ladi.
-->