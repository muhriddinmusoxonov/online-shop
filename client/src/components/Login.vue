<script setup lang="ts">
import Button from '@/ui-components/Button.vue';
import Input from '@/ui-components/Input.vue';

</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-29 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-3xl font-bold tracking-tight text-orange-600">Login</h2>
    </div>

    <div class="mt-10 flex justify-center items-center sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <Input i-class="fa-solid fa-envelope inline text-orange-600 text-2xl mx-2" type="email" placeholder="Gmail Address..." />

        <Input i-class="fa-solid fa-key inline text-orange-600 text-2xl mx-2" type="password" placeholder="Password..." />
          <div class="text-sm flex justify-end items-center mt-3">
              <router-link :to="{name: 'forgotPassword'}"><a href="#" class="font-semibold text-orange-600 hover:text-orange-400">Forgot password?</a></router-link>
          </div>

        <div class="ml-10">
          <Button>Login</Button>
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