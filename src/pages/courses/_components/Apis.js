import { ApiRequest } from 'src/lib/apis/axios'

export default class CourseApi {
  // Get All Courses
  static getAllCourses = async data => await ApiRequest('/course/list', 'GET')

  // Single Delete Course
  static deleteCourse = async guidToDelete => await ApiRequest(`/course/delete/${guidToDelete}`, 'DELETE')

  // Update Course
  static updateCourse = async ({ guid, data }) => await ApiRequest(`/course/update/${guid}`, 'POST', { data })

  // View Course
  static viewCourse = async guid => await ApiRequest(`/course/view/${guid}`, 'GET')

  // Change Course Status
  static statusCourse = async ({ id, data }) => await ApiRequest(`/course/status/${id}`, 'POST', { data })

  // Create Course
  static createCourse = async data => await ApiRequest(`/course/create`, 'POST', { data })

  // Filter Course
  static filterCourse = async data => await ApiRequest(`/course/list`, 'POST', { data })

  // Get All Subjects of course
  static getSubjects = async guid => await ApiRequest(`/course/${guid}/subjects`, 'POST')

  // Filter Tests
  static filterTest = async ({ guid, data }) => await ApiRequest(`/course/get_tests/${guid}`, 'POST', { data })

  // Filter Meetings
  static filterMeetings = async ({ guid, data }) => await ApiRequest(`/course/zoom/get_meetings/${guid}`, 'POST', { data })

  // Get All Enrolled Users
  static enrolledUsers = async ({ guid, data }) => await ApiRequest(`/course/enrolments/${guid}`, 'POST', { data })
}
