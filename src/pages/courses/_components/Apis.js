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
  static enrolledUsers = async guid => await ApiRequest(`/course/enrolments/${guid}`, 'POST')

  // Create Subject
  static createSubject = async ({ guid, data }) => await ApiRequest(`/course/${guid}/subject/create`, 'POST', { data })

  // View Subject
  static viewSubject = async subjectId => await ApiRequest(`/course/subject/${subjectId}/view`, 'POST')

  // Edit Subject
  static editSubject = async ({ subjectId, data }) => await ApiRequest(`/course/subject/${subjectId}/edit`, 'POST', { data })

  // Delete Subject
  static deleteSubject = async subjectId => await ApiRequest(`/course/subject/${subjectId}/delete`, 'DELETE')

  // Change Subject Subject
  static statusSubject = async ({ subjectId, data }) => await ApiRequest(`/course/subject/${subjectId}/change_status`, 'POST', { data })

  // Edit Lesson
  static allLesson = async subjectId => await ApiRequest(`/course/subject/${subjectId}/lessons`, 'POST')


  // Create Lesson
  static createLesson = async ({ subjectId, data }) => await ApiRequest(`/course/subject/${subjectId}/lesson/create`, 'POST', { data })

  // Edit Lesson
  static previewLesson = async lessonId => await ApiRequest(`/course/lesson/${lessonId}/preview`, 'POST')

  // Edit Lesson
  static editLesson = async ({ lessonId, data }) => await ApiRequest(`/course/lesson/${lessonId}/edit`, 'POST', { data })

  // Delete Lesson
  static deleteLesson = async lessonId => await ApiRequest(`/course/lesson/${lessonId}/delete`, 'DELETE')

  // Status Lesson
  static statusLesson = async ({ lessonId, data }) => await ApiRequest(`/course/lesson/${lessonId}/change_status`, 'POST', { data })

  // Get Sections in Lesson
  static allSections = async lessonId => await ApiRequest(`/course/lesson/${lessonId}/sections`, 'POST')

  // Create Section in lesson
  // Get Sections in Lesson
  static createSection = async ({ lessonId, data }) => await ApiRequest(`/course/lesson/${lessonId}/section/create`, 'POST', { data })
}
