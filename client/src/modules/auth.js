import { setItem } from "@/helpers/persistaneStorage";
import AuthService from "@/service/auth";
import {getterTypes} from './types'

const state = {
  isLoading: false,
  user: null,
  error: null,
  isLoggedIn: null
}

const getters = {
  [getterTypes.currentUser]: state => {
    return state.user
  },
  [getterTypes.isLoggedIn]: state => {
    return Boolean(state.isLoggedIn)
  },
  [getterTypes.isAnonymous]: state => {
    return state.isLoggedIn === false;
  }
}

const mutations = {
  registerStart(state) {
    state.isLoading = true;
    state.user = null
    state.error = null
    state.isLoggedIn = null
  },
  registerSuccess(state, payload) {
    state.isLoading = false
    state.user = payload,
    state.isLoggedIn = null
  },
  registerFailure(state, payload) {
    state.isLoading = false
    state.error = payload
    state.isLoggedIn = false
  },

  loginStart(state) {
    state.isLoading = true,
    state.user = null,
    state.error = null
    state.isLoggedIn = null
  },

  loginSuccess(state, payload) {
    state.isLoading = false,
    state.user = payload
    state.isLoggedIn = true
  },

  loginFailure(state, payload) {
    state.isLoading = false,
    state.error = payload
    state.isLoggedIn = false
  },

  checkRegisterCodeStart(state) {
    state.isLoading = true,
    state.user = null,
    state.error = null
    state.isLoggedIn = null
  },

  checkRegisterCodeSuccess(state, payload) {
    state.isLoading = false,
    state.user = payload
    state.isLoggedIn = null
  },

  checkRegisterCodeFailure(state, payload) {
    state.isLoading = false,
    state.error = payload
    state.isLoggedIn = false
  },

  checkCodeStart(state) {
    state.isLoading = true,
    state.user = null,
    state.error = null
  },

  checkCodeSuccess(state, payload) {
    state.isLoading = false,
    state.user = payload
    state.isLoggedIn = null
  },

  checkCodeFailure(state, payload) {
    state.isLoading = false,
    state.error = payload
    state.isLoggedIn = false
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

  forgotPasswordStart(state) {
    state.isLoading = true,
    state.user = null,
    state.error = null
    state.isLoggedIn = null
  },

  forgotPasswordSuccess(state, payload) {
    state.isLoading = false,
    state.user = payload,
    state.isLoggedIn = null
  },

  forgotPasswordFailure(state, payload) {
    state.isLoading = false,
    state.error = payload
    state.isLoggedIn = false
  },

  resetCodeStart(state) {
    state.isLoading = true,
    state.user = null,
    state.error = null
    state.isLoggedIn = null
  },

  resetCodeSuccess(state, payload) {
    state.isLoading = false,
    state.user = payload
    state.isLoggedIn = null
  },

  resetCodeFailure(state, payload) {
    state.isLoading = false,
    state.error = payload
    state.isLoggedIn = false
  },

  getUserStart(state) {
    state.isLoading = true
  },

  getUserSuccess(state, payload) {
    state.isLoading = false,
    state.user = payload,
    state.isLoggedIn = true
  },

  getUserFailure(state, payload) {
    state.isLoading = false,
    state.error = payload
    state.user = null
    state.isLoggedIn = false
  },

  logout(state) {
    state.user = null
    state.isLoggedIn = false
  }
}

const actions = {
  register(context, user) {
    return new Promise((resolve,reject) => {
      context.commit('registerStart')
      AuthService.register(user).then(response => {
        context.commit('registerSuccess', response.data.data)
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
        context.commit('resendCodeSuccess', response.data.data)
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
        context.commit('checkRegisterCodeSuccess', response.data.data)
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
        context.commit('loginSuccess', response.data.data)
        setItem('token', response.data.meta.token)
        resolve(response.data.user)
      })
        .catch(error => {
          const msg = Array.isArray(error.response?.data?.message) ? error.response?.data?.message : [error.response?.data?.message];

          context.commit('loginFailure', msg)
          reject(error.response.data)
        })
    })
  },

  forgotPassword(context, email) {
    return new Promise((resolve, reject) => {
      context.commit('forgotPasswordStart')
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      AuthService.forgotPassword(email).then(response => {
        context.commit('forgotPasswordSuccess', response.data.data)
        setItem('email', email.email)
        setItem('token', response.data.meta.token)
        resolve(response.data.user)
      })
        .catch(error => {
          const msg = Array.isArray(error.response?.data?.message) ? error.response?.data?.message : [error.response?.data?.message];

          context.commit('forgotPasswordFailure', msg)
          reject(error.response.data)
        })
    })
  },

  checkCode(context, code) {
    return new Promise((resolve, reject) => {
      context.commit('checkCodeStart')
      AuthService.checkForgotCode(code).then(response => {
        context.commit('checkCodeSuccess', response.data.data)
        localStorage.removeItem('token')
        setItem('token', response.data.meta.token)
        resolve(response.data.user)
      })
        .catch(error => {
          const msg = Array.isArray(error.response?.data?.message) ? error.response?.data?.message : [error.response?.data?.message];

          context.commit('checkCodeFailure', msg)
          reject(error.response.data)
        })
    })
  },

  resetCode(context, code) {
    return new Promise((resolve, reject) => {
      context.commit('resetCodeStart')
      AuthService.resetCode(code).then(response => {
        context.commit('resetCodeSuccess', response.data.data)
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        resolve(response.data.user)
      })
        .catch(error => {
          const msg = Array.isArray(error.response?.data?.message) ? error.response?.data?.message : [error.response?.data?.message];

          context.commit('resetCodeFailure', msg)
          reject(error.response.data)
        })
    })
  },

  getUser(context) {
    return new Promise((resolve) => {
      context.commit('getUserStart')
      AuthService.getUser().then(response => {
        console.log(response.data.data);

        context.commit('getUserSuccess', response.data.data)
        resolve(response.data.user)
      }).catch(() => context.commit('getUserFailure'))
    })
  },

  logout(context) {
    context.commit('logout')
    localStorage.removeItem('token')
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}