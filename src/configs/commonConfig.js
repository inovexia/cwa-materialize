import { ApiRequest } from 'src/lib/axios'

export default class AuthApi {
  static getTokenDetails = async () => await ApiRequest('/auth/token_details', 'GET')

  static logIn = async data => await ApiRequest('/auth/login', 'POST', data)
  static regCommonSettings = async () => await ApiRequest('/settings/registration/common', 'GET')
  static RegRequiredField = async () => await ApiRequest('/settings/registration/valid_fields', 'GET')
}
