import { ApiRequest } from 'src/lib/apis/axios'

export default class UserApi {
  // Get All Users
  static getAllUsers = async data => await ApiRequest('/users/list', 'GET')

  // Single Delete User
  static deleteUser = async guidToDelete => await ApiRequest(`/users/delete/${guidToDelete}`, 'POST', guidToDelete)

  // Bulk Delete User
  static bulDeleteUser = async data => await ApiRequest(`/users/delete/`, 'POST', { data })

  // Trash User
  static trashUser = async data => await ApiRequest(`/users/trash`, 'POST', { data })

  // Update User
  static updateUser = async ({ id, data }) => await ApiRequest(`/users/update/${id}`, 'POST', { data })

  // View User
  static viewUser = async id => await ApiRequest(`/users/view/${id}`, 'GET')

  // Create User
  static createUser = async data => await ApiRequest(`/users/add`, 'POST', { data })

  // Filter User
  static filterUsers = async data => await ApiRequest(`/users/list`, 'POST', { data })

  // Change User Status
  static changeStatus = async data => await ApiRequest(`/users/change_status`, 'POST', { data })
}
