import { ApiRequest } from 'src/lib/apis/axios'

export default class AuthApi {
  // Login
  static userLogin = async data => await ApiRequest('/auth/login', 'POST', { data })

  // Register
}
