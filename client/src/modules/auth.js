import { setItem } from "@/helpers/persistaneStorage";
import AuthService from "@/service/auth";

const state = {
  isLoading: false,
  user: null,
  error: null
}

const mutations = {
  registerStart(state) {
    state.isLoading = true;
    state.user = null
    state.error = null
  },
  registerSuccess(state, payload) {
    state.isLoading = false
    state.user = payload
  },
  registerFailure(state, payload) {
    state.isLoading = false
    state.error = payload

  }
}

const actions = {
  register(context, user) {
    return new Promise((resolve,reject) => {
      context.commit('registerStart')
      AuthService.register(user).then(response => {
        context.commit('registerSuccess', response.data.user)
        setItem('token', response.data.meta.token)
        resolve(response.data.user)
      })
        .catch(error => {
          const msg = Array.isArray(error.response?.data?.message) ? error.response?.data?.message : [error.response?.data?.message];

          context.commit('registerFailure', msg)
          reject(error.response.data)
      })
    })
  },

  checkRegisterCode(context, code) {
    return new Promise((resolve, reject) => {
      context.commit('registerStart')
      AuthService.checkCode(code).then(response => {
        context.commit('registerSuccess', response.data)
        resolve(response.data.meta)
      })
        .catch(error => {
          context.commit('registerFailure', error)
          reject(error.response.data)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}