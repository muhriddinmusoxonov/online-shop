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

  },

  loginStart(state) {
    state.isLoading = true,
    state.user = null,
    state.error = null
  },

  loginSuccess(state, payload) {
    state.isLoading = false,
    state.user = payload
  },

  loginFailure(state, payload) {
    state.isLoading = false,
    state.error = payload
  },

  checkRegisterCodeStart(state) {
    state.isLoading = true,
      state.user = null,
      state.error = null
  },

  checkRegisterCodeSuccess(state, payload) {
    state.isLoading = false,
      state.user = payload
  },

  checkRegisterCodeFailure(state, payload) {
    state.isLoading = false,
      state.error = payload
  },

  resendCodeStart(state) {
    state.isLoading = true,
      state.user = null,
      state.error = null
  },

  resendCodeSuccess(state, payload) {
    state.isLoading = false,
      state.user = payload
  },

  resendCodeFailure(state, payload) {
    state.isLoading = false,
      state.error = payload
  },
}

const actions = {
  register(context, user) {
    return new Promise((resolve,reject) => {
      context.commit('registerStart')
      AuthService.register(user).then(response => {
        context.commit('registerSuccess', response.data.user)
        setItem('token', response.data.meta.token)
        setItem('email', user.email)
        resolve(response.data.user)
      })
        .catch(error => {
          const msg = Array.isArray(error.response?.data?.message) ? error.response?.data?.message : [error.response?.data?.message];

          context.commit('registerFailure', msg)
          reject(error.response.data)
      })
    })
  },

  resendCode(context, email) {
    return new Promise((resolve, reject) => {
      context.commit('resendCodeStart')
      localStorage.removeItem('token')
      AuthService.resendCode(email).then(response => {
        context.commit('resendCodeSuccess', response.data.user)
        setItem('token', response.data.meta.token)
        resolve(response.data.user)
      })
        .catch(error => {
          const msg = Array.isArray(error.response?.data?.message) ? error.response?.data?.message : [error.response?.data?.message];

          context.commit('resendCodeFailure', msg)
          reject(error.response.data)
        })
    })
  },

  checkRegisterCode(context, code) {
    return new Promise((resolve, reject) => {
      context.commit('checkRegisterCodeStart')
      AuthService.checkCode(code).then(response => {
        context.commit('checkRegisterCodeSuccess', response.data)
        localStorage.removeItem('email')
        resolve(response.data.meta)
      })
        .catch(error => {
          const msg = Array.isArray(error.response?.data?.message) ? error.response?.data?.message : [error.response?.data?.message];

          context.commit('checkRegisterCodeFailure', msg)
          reject(error.response.data)
        })
    })
  },

  login(context, user) {
    return new Promise((resolve, reject) => {
      context.commit('loginStart')
      AuthService.login(user).then(response => {
        context.commit('loginSuccess', response.data.user)
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


}

export default {
  state,
  mutations,
  actions
}