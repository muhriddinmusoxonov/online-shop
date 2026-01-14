<script setup lang="ts">
import Button from '@/ui-components/Button.vue';
import Input from '@/ui-components/Input.vue';

</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-29 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-3xl font-bold tracking-tight text-orange-600">Reset Code</h2>
    </div>

    <div class="mt-15 flex justify-center items-center sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <Input i-class="fa-solid fa-key inline text-orange-600 text-2xl mx-2" type="password" placeholder="New Password..."/>

        <Input i-class="fa-solid fa-key inline text-orange-600 text-2xl mx-2" type="password" placeholder="Confirm Password..."/>

        <div class="ml-10">
          <div class="w-80 mx-auto">
            <Button>Reset</Button>
          </div>
       </div>
      </form>
    </div>
  </div>
</template>