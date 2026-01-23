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
  }
}

export default AuthService;