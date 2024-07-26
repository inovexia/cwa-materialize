import { ApiRequest } from 'src/lib/apis/axios'

export default class TestApis {
  /** TEST SHELL */
  static getAllTests = async data => await ApiRequest('tests/list', 'POST', { data })
  static addTest = async ({ data }) => await ApiRequest('tests/add', 'POST', { data })
  static editTest = async ({ guid, data }) => await ApiRequest(`tests/add/${guid}`, 'POST', { data })
  static changeStatus = async ({ guid, data }) => await ApiRequest(`tests/status/${guid}`, 'POST', { data })
  static testSettings = async ({ guid, data }) => await ApiRequest(`tests/settings/${guid}`, 'POST', { data })
  static viewTest = async ({ guid }) => await ApiRequest(`tests/view/${guid}`, 'GET')
  static deleteTest = async ({ guid }) => await ApiRequest(`tests/delete/${guid}`, 'DELETE')
  static previewTest = async ({ guid }) => await ApiRequest(`tests/preview/${guid}`, 'GET')

  /** QUESTIONS */
  static testQuestions = async ({ guid }) => await ApiRequest(`tests/questions/${guid}`, 'GET')
  static viewQuestion = async ({ guid }) => await ApiRequest(`qb/questions/${guid}/view`, 'POST')
  static addQuestion = async ({ guid, data }) => await ApiRequest(`tests/create_question/${guid}`, 'POST', { data })
  static editQuestion = async ({ guid, qid, data }) => await ApiRequest(`tests/create_question/${guid}/${qid}`, 'POST', { data })
  static uploadQuestions = async ({ guid, data }) => await ApiRequest(`tests/upload_question/${guid}`, 'POST', { data })
  static saveUploadedQuestions = async ({ guid, data }) => await ApiRequest(`tests/save_uploaded_questions/${guid}`, 'POST', { data })
  static removeQuestions = async ({ guid, data }) => await ApiRequest(`tests/remove_question/${guid}`, 'POST', { data })
  static removeAllQuestions = async ({ guid }) => await ApiRequest(`tests/remove_all_questions/${guid}`, 'DELETE')
  static deleteAllQuestions = async ({ guid }) => await ApiRequest(`tests/remove_all_questions/${guid}/1`, 'DELETE')

  /** CATEGORIES */
  static getCategories = async ({ data }) => await ApiRequest(`tests/categories`, 'POST', { data })
  static createCategories = async ({ data }) => await ApiRequest(`tests/create_category`, 'POST', { data })

}
