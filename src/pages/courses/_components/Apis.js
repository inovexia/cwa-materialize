import { ApiRequest } from 'src/lib/apis/axios'

export default class CourseApi {
  // Courses
  static getAllCourses = async data => await ApiRequest('/course/list', 'GET')
  static deleteCourse = async guidToDelete => await ApiRequest(`/course/delete/${guidToDelete}`, 'DELETE')
  static updateCourse = async ({ guid, data }) => await ApiRequest(`/course/update/${guid}`, 'POST', { data })
  static viewCourse = async guid => await ApiRequest(`/course/view/${guid}`, 'GET')
  static statusCourse = async ({ id, data }) => await ApiRequest(`/course/status/${id}`, 'POST', { data })
  static createCourse = async data => await ApiRequest(`/course/create`, 'POST', { data })
  static filterCourse = async data => await ApiRequest(`/course/list`, 'POST', { data })

  // Categories
  static courseCategory = async data => await ApiRequest(`/course/categories`, 'POST', { data })
  static createCategory = async data => await ApiRequest(`/course/category/create`, 'POST', { data })
  static deleteCategory = async guidToDelete => await ApiRequest(`/course/category/${guidToDelete}/delete`, 'DELETE')
  static viewCategory = async guid => await ApiRequest(`/course/category/${guid}/view`, 'POST')
  static updateCategory = async ({ guid, data }) => await ApiRequest(`/course/category/${guid}/edit`, 'POST', { data })

  // Subjects
  static getSubjects = async guid => await ApiRequest(`/course/${guid}/subjects`, 'POST')
  static createSubject = async ({ guid, data }) => await ApiRequest(`/course/${guid}/subject/create`, 'POST', { data })
  static viewSubject = async subjectId => await ApiRequest(`/course/subject/${subjectId}/view`, 'POST')
  static editSubject = async ({ subjectId, data }) => await ApiRequest(`/course/subject/${subjectId}/edit`, 'POST', { data })
  static deleteSubject = async subjectId => await ApiRequest(`/course/subject/${subjectId}/delete`, 'DELETE')
  static statusSubject = async ({ subjectId, data }) => await ApiRequest(`/course/subject/${subjectId}/change_status`, 'POST', { data })

  // Lesson
  static allLesson = async subjectId => await ApiRequest(`/course/subject/${subjectId}/lessons`, 'POST')
  static createLesson = async ({ subjectId, data }) => await ApiRequest(`/course/subject/${subjectId}/lesson/create`, 'POST', { data })
  static previewLesson = async lessonId => await ApiRequest(`/course/lesson/${lessonId}/preview`, 'POST')
  static editLesson = async ({ lessonId, data }) => await ApiRequest(`/course/lesson/${lessonId}/edit`, 'POST', { data })
  static deleteLesson = async lessonId => await ApiRequest(`/course/lesson/${lessonId}/delete`, 'DELETE')
  static statusLesson = async ({ lessonId, data }) => await ApiRequest(`/course/lesson/${lessonId}/change_status`, 'POST', { data })

  // Sections
  static allSections = async lessonId => await ApiRequest(`/course/lesson/${lessonId}/sections`, 'POST')
  static createSection = async ({ lessonId, data }) => await ApiRequest(`/course/lesson/${lessonId}/section/create`, 'POST', { data })
  static previewSection = async sectionId => await ApiRequest(`/course/section/${sectionId}/preview`, 'POST')

  // Content
  static arrangeContent = async ({ sectionId, data }) => await ApiRequest(`/course/section/${sectionId}/content/arrange`, 'POST', { data })


  //Test Module
  static filterTest = async ({ guid, data }) => await ApiRequest(`/course/get_tests/${guid}`, 'POST', { data })
  static createTest = async ({ guid, data }) => await ApiRequest(`/course/create_test/${guid}`, 'POST', { data })
  static deleteTest = async ({ guid, data }) => await ApiRequest(`/course/delete_tests/${guid}`, 'POST', { data })
  static removeTest = async ({ guid, data }) => await ApiRequest(`/course/remove_tests/${guid}`, 'POST', { data })
  static viewTest = async ({ guid }) => await ApiRequest(`/tests/view/${guid}`, 'GET')
  static testSetting = async ({ guid, data }) => await ApiRequest(`/tests/settings/${guid}`, 'POST', { data })
  static changeTestStatus = async testGuid => await ApiRequest(`/tests/status/${testGuid}`, 'POST')
  static addQuestion = async ({ guid, data }) => await ApiRequest(`/tests/create_question/${guid}`, 'POST', { data })
  static getAllQuestions = async ({ guid }) => await ApiRequest(`/tests/questions/${guid}`, 'GET')
  static updateQuestion = async ({ guid, qid, data }) => await ApiRequest(`/tests/create_question/${guid}/${qid}`, 'POST', { data })

  // Enrollments
  static enrolledUsers = async guid => await ApiRequest(`/course/enrolments/${guid}`, 'POST')
  static unEnrolledUsers = async guid => await ApiRequest(`/course/notenroled/${guid}`, 'POST')
  static enrollUser = async ({ guid, data }) => await ApiRequest(`/course/enrol/${guid}`, 'POST', { data })

  // Filter Meetings
  static filterMeetings = async ({ guid, data }) => await ApiRequest(`/course/zoom/get_meetings/${guid}`, 'POST', { data })

}
