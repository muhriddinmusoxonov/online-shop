<script setup lang="ts">
import Button from '@/ui-components/Button.vue';
import Input from '@/ui-components/Input.vue';

</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-29 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-3xl font-bold tracking-tight text-orange-600">Check Code</h2>
    </div>

    <div class="mt-17 flex justify-center items-center sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">

        <Input i-class="fa-solid fa-key inline text-orange-600 text-2xl mx-2" type="text" placeholder="Your code..."/>

        <div class="ml-10">
          <div class="w-80 mx-auto">
           <Button>Send</Button>
        </div>
        </div>
      </form>

    </div>
  </div>
</template>