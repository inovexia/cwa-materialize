import { ApiRequest } from 'src/lib/apis/axios'

export default class CourseApi {
  // Get All Courses
  static getAllCourses = async data => await ApiRequest('/course/list', 'GET')

  // Single Delete Course
  static deleteCourse = async guidToDelete => await ApiRequest(`/course/delete/${guidToDelete}`, 'DELETE')

  // Update Course
  static updateCourse = async ({ id, data }) => await ApiRequest(`/course/update/${id}`, 'POST', { data })

  // View Course
  static viewCourse = async id => await ApiRequest(`/course/view/${id}`, 'GET')

  // Change Course Status
  static statusCourse = async ({ id, data }) => await ApiRequest(`/course/status/${id}`, 'POST', { data })

  // Create Course
  static createCourse = async data => await ApiRequest(`/course/create`, 'POST', { data })

  // Filter Course
  static filterCourse = async data => await ApiRequest(`/course/list`, 'POST', { data })
}
