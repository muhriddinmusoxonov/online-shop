import ProductService from "@/service/products"

const state = {
  data: null,
  isLoading: false,
  error: null,
  productDetail: null
}

const mutations = {
  getProductsStart(state) {
    state.isLoading = true
    state.productDetail = null
  },

  getProductsSuccess(state, payload) {
    state.isLoading = false
    state.data = payload
  },

  getProductsFailure(state, payload) {
    state.isLoading = false
    state.error = payload
    state.data = null
  },

  getProductsDetailStart(state) {
    state.isLoading = true
  },

  getProductsDetailSuccess(state, payload) {
    state.isLoading = false
    state.productDetail = payload
  },

  getProductsDetailFailure(state, payload) {
    state.isLoading = false
    state.error = payload,
    state.productDetail = null
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
  },

  getProductDetail(context, slug) {
    return new Promise((resolve, reject) => {
      context.commit('getProductsDetailStart')
      ProductService.getProductDetail(slug).then(data => {
        context.commit('getProductsDetailSuccess', data.data.data)
        resolve(data.data.data)
      }).catch(message => context.commit('getProductsDetailFailure', message))
    })
  }
}

export default { state, mutations, actions };