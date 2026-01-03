<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-29 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-3xl font-bold tracking-tight text-orange-600">Login</h2>
    </div>

    <div class="mt-10 flex justify-center items-center sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <div class="mt-2 flex justify-center items-center">
            <i class="fa-solid fa-envelope inline text-orange-600 text-2xl mx-2"></i>
            <input type="email" name="email" id="email" autocomplete="email" required class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-orange-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" placeholder="Gmail Address..." />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
          </div>
          <div class="mt-2 flex justify-center items-center">
            <i class="fa-solid fa-key inline text-orange-600 text-2xl mx-2"></i>
            <input type="password" name="password" id="password" autocomplete="current-password" required class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-orange-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" placeholder="Password..." />
          </div>
          <div class="text-sm flex justify-end items-center mt-3">
              <router-link :to="{name: 'forgotPassword'}"><a href="#" class="font-semibold text-orange-600 hover:text-orange-400">Forgot password?</a></router-link>
            </div>
        </div>

        <div class="ml-10">
          <div class="w-80 mx-auto">
          <button type="submit" class="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Sign in</button>
        </div>
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