<script>
import Button from '@/ui-components/Button.vue';
import Input from '@/ui-components/Input.vue';
import ValidationErrors from '../components/ValidationErrors.vue';

export default {

  data() {
    return {
      name: '',
      price: '',
      stock: '',
      user_id: '',
      category_id: '',
      image_url: '',
      description: ''
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
      const product = {
        name: this.name,
        price: this.price,
        stock: this.stock,
        user_id: this.user_id,
        category_id: this.category_id,
        image_url: this.image_url,
        description: this.description
      }
      console.log(product);

      // this.$store.dispatch('register', {...user}).then(data => {console.log("Data", data), this.$router.push('/check-code/register')
      // }).catch(error => {console.log("ERROR", error)
      // }) //user -> payload deb ataladi.
    }
  }
}

</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="ml-7.5">
        <h2 class="mt-9 text-center text-3xl font-bold tracking-tight text-orange-600">Create Product</h2>
      </div>
    </div>

    <div class="mt-10 flex justify-center items-center sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <ValidationErrors v-if="validationErrors" :validationErrors="validationErrors" />
        <Input id="Name" type="string" v-model="name" placeholder="Name..."/>

        <Input id="Price" type="number" v-model="price" placeholder="Price..."/>

        <Input id="Stock" type="number" v-model="stock" placeholder="Stock..." />

        <!-- <Input i-class="fa-solid fa-phone inline text-orange-600 text-2xl mx-2" id="phoneNumber" type="string" v-model="phone" placeholder="user_id..." /> -->

        <!-- <Input i-class="fa-solid fa-key inline text-orange-600 text-2xl mx-2" id="password" type="string" v-model="password" placeholder="category_id..." /> -->

        <Input id="ImageUrl" type="string" v-model="image_url" placeholder="Image_url..." />

        <Input id="Description" type="string" v-model="description" placeholder="Description..." />


        <div class="">
          <Button type="submit" @click="submitHandler" :disabled="isLoading">Create</Button>
        </div>
      </form>
    </div>
  </div>
</template>