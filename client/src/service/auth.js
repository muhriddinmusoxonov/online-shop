import api from "./axios";

const AuthService = {
  register(user) {
    return api.post('/auth/register', user);
  },

  checkCode(code) {
    return api.post('/auth/register-check-code', code)
  },

  login(user) {
    return api.post('/auth/login', user)
  },

  resendCode(email) {
    return api.post('/auth/resend-code', email)
  },

  forgotPassword(email) {
    return api.post('/auth/forgot-password', email)
  },

  checkForgotCode(code) {
  return api.post('/auth/check-code', code)
  },

  resetCode(code) {
    return api.post('/auth/reset-code', code)
  }
}

export default AuthService;