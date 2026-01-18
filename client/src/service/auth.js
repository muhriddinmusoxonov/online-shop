import api from "./axios";

const AuthService = {
  register(user) {
    return api.post('/auth/register', user);
  },

  checkCode(code) {
    return api.post('/auth/register-check-code', code)
  }
}

export default AuthService;