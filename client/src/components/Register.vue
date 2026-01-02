<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-orange-600">Register Form</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <!-- <label for="fullName" class="block text-sm/6 font-medium text-orange-600">Full Name</label> -->
          <div class="mt-2 flex justify-center items-center">
            <i class="fa-solid fa-user inline text-orange-600 text-2xl mx-2"></i>
            <input type="text" name="fullName" id="fullName" autocomplete="fullName" required class="w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-orange-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" placeholder="Full Name..." />
          </div>
        </div>

        <div>
          <!-- <label for="email" class="block text-sm/6 font-medium text-orange-600">Email Address</label> -->
          <div class="mt-2 flex justify-center items-center">
            <i class="fa-solid fa-envelope inline text-orange-600 text-2xl mx-2"></i>
            <input type="email" name="email" id="email" autocomplete="email" required class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-orange-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" placeholder="Gmail Address..."/>
          </div>
        </div>

        <div>
          <!-- <label for="phoneNumber" class="block text-sm/6 font-medium text-orange-600">Phone Number</label> -->
          <div class="mt-2 flex justify-center items-center">
            <i class="fa-solid fa-phone inline text-orange-600 text-2xl mx-2"></i>
            <input type="phoneNumber" name="phoneNumber" id="phoneNumber" autocomplete="phoneNumber" required class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-orange-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" placeholder="Phone Number..."/>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <!-- <label for="password" class="block text-sm/6 font-medium text-orange-600">Password</label> -->
          </div>
          <div class="mt-2 flex justify-center items-center">
            <i class="fa-solid fa-key inline text-orange-600 text-2xl mx-2"></i>
            <input type="password" name="password" id="password" autocomplete="current-password" required class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-orange-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" placeholder="Password..." />
          </div>
        </div>

        <div class="w-60 ml-22">
          <button type="submit" class="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Sign in</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-400 ml-8">
        Not a member?
        {{ ' ' }}
        <a href="#" class="font-semibold text-orange-600 hover:text-indigo-300">Start a 14 day free trial</a>
      </p>
    </div>
  </div>
</template>