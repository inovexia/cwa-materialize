import { ApiRequest } from 'src/lib/apis/axios'

export default class OnlineClassApis {
  // All Online Class
  static getAllOnlineClassList = async data => await ApiRequest('zoom/list', 'POST', { data })
  // Create Online Class
  static addOnlineClass = async ({ data }) => await ApiRequest('zoom/create', 'POST', { data })
  // Delete Online Class
  static deleteOnlineClass = async ({ guid }) => await ApiRequest(`zoom/delete/${guid}`, 'DELETE')
  // Edit Online Class
  static editOnlineClass = async ({ guid, data }) => await ApiRequest(`zoom/create/${guid}`, 'POST', { data })
  // View Online Class
  static viewOnlineClass = async ({ guid }) => await ApiRequest(`zoom/view/${guid}`, 'GET')
  // Get All Users
  static getAllUsers = async data => await ApiRequest('/users/list', 'GET')
  // Share Online Class
  // static shareOnlineClass = async ({ guid, data }) => await ApiRequest(`/zoom/share/${guid}`, 'POST', { data })
  // already user in online class
  static getUserEnrolList = async (guid) => await ApiRequest(`zoom/get_users/${guid}`, 'GET')
  // Share online class to user
  static shareToUser = async ({ guid, data }) => await ApiRequest(`zoom/share/${guid}`, 'POST', { data })
}
