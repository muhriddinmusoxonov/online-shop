import axios from "./axios";

const AuthService = {
  register(user) {
    return axios.post('/auth/register', user);
}
}

export default AuthService;