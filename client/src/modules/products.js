import ProductService from "@/service/products"

const state = {
  data: null,
  isLoading: false,
  error: null
}

const mutations = {
  getProductsStart(state) {
    state.isLoading = true
  },

  getProductsSuccess(state, payload) {
    state.isLoading = false
    state.data = payload
  },

  getProductsFailure(state, payload) {
    state.isLoading = false
    state.error = payload
    state.data = null
  }
}

const actions = {
  getProducts(context) {
    return new Promise((resolve, reject) => {
      context.commit('getProductsStart')
      ProductService.getproducts().then(data => {
        context.commit('getProductsSuccess', data.data.data)
        console.log('Data:', data.data)
      }
      ).catch(message => context.commit('getProductsFailure', message)
      )
    })
  }
}

export default { state, mutations, actions };