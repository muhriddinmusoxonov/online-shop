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
    state.error = payload.response.data
  }
}

const actions = {
  register(context, user) {
    return new Promise((resolve,reject) => {
      context.commit('registerStart')
      AuthService.register(user).then(response => {
        context.commit('registerSuccess', response.data)
        resolve(response.data.meta)
        setItem('token', response.data.meta.token)
      })
        .catch(error => {
          context.commit('registerFailure', error)
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
        // setItem('token', response.data.meta.token)
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