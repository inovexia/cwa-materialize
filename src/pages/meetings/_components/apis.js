import { ApiRequest } from 'src/lib/axios'

export default class MeetingApi {
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

  // Meeting list
  static meetingList = async data => await ApiRequest(`/zoom/list`, 'POST', { data })

  // Create Meeting
  static createMeeting = async data => await ApiRequest(`/zoom/create`, 'POST', { data })

  // Share Meeting
  static shareMeeting = async ({ id, data }) => await ApiRequest(`/zoom/share/${id}`, 'POST', { data })

  // Update Meeting
  static updateMeeting = async ({ id, data }) => await ApiRequest(`/zoom/create/${id}`, 'POST', { data })

  // View Meeting
  static viewMeeting = async guidToDelete => await ApiRequest(`/zoom/view/${guidToDelete}`, 'GET')

  // Delete Meeting
  static deleteMeeting = async guidToDelete => await ApiRequest(`/zoom/delete/${guidToDelete}`, 'DELETE')

  // Get Meeting Users
  static meetingUsers = async id => await ApiRequest(`/zoom/get_users//${id}`, 'GET')

  // Get User Meetings
  static usersMeeting = async userId => await ApiRequest(`/zoom/get_meetings/${userId}`, 'GET')
}
