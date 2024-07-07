import { ApiRequest } from 'src/lib/apis/axios'

export default class OnlineClassApi {
  //all existing online class list
  static outsideOnlineClassList = async data => await ApiRequest(`/zoom/list`, 'POST', { data })

  //add existing online class into course
  static addExistingOnlineClass = async ({ guid, data }) => await ApiRequest(`course/zoom/add_meeting/${guid}`, 'POST', { data })

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

  // Get All Subjects of course
  static getSubjects = async guid => await ApiRequest(`/course/${guid}/subjects`, 'POST')

  // Online Class list
  static onlineClassList = async guid => await ApiRequest(`course/zoom/get_meetings/${guid}`, 'POST')

  // Create Online Class
  static createOnlineClass = async ({ guid, data }) => await ApiRequest(`course/zoom/create_meeting/${guid}`, 'POST', { data })

  // Share Online Class
  static shareOnlineClass = async ({ id, data }) => await ApiRequest(`/zoom/share/${id}`, 'POST', { data })

  // Update Online Class
  static updateOnlineClass = async ({ id, data }) => await ApiRequest(`/zoom/create/${id}`, 'POST', { data })

  // View Online Class
  static viewOnlineClass = async guidToDelete => await ApiRequest(`/zoom/view/${guidToDelete}`, 'GET')

  // Remove Online Class
  static removeOnlineClass = async guid => await ApiRequest(`/course/zoom/remove_meetings/${guid}`, 'GET')


  // static deleteUser = async guidToDelete => await ApiRequest(`/users/delete/${guidToDelete}`, 'POST', guidToDelete)

  // Delete Online Class
  static deleteOnlineClass = async guidToDelete => await ApiRequest(`/course/zoom/delete_meetings/${guidToDelete}`, 'POST', guidToDelete)

  // Get Online Class Users
  static meetingUsers = async id => await ApiRequest(`/zoom/get_users//${id}`, 'GET')

  // Get User Online Class
  static usersOnlineClass = async userId => await ApiRequest(`/zoom/get_meetings/${userId}`, 'GET')
}
