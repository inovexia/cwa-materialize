import { ApiRequest } from 'src/lib/apis/axios'

export default class TestApis {
  /** TEST SHELL */
  static getAllQuestions = async data => await ApiRequest('qb/questions/list', 'POST', { data })
  static addQuestion = async ({ data }) => await ApiRequest('qb/questions/create', 'POST', { data })
  static editQuestion = async ({ guid, data }) => await ApiRequest(`qb/questions/${guid}/update`, 'POST', { data })
  static uploadQuestions = async ({ data }) => await ApiRequest(`qb/questions/import`, 'POST', { data })
  static viewQuestion = async ({ guid }) => await ApiRequest(`qb/questions/${guid}/view`, 'POST')
  static deleteQuestion = async ({ guid }) => await ApiRequest(`qb/questions/${guid}/delete`, 'DELETE')
  static bulkDeleteQuestions = async ({ data }) => await ApiRequest(`qb/questions/delete`, 'POST', { data })

  /** CATEGORIES */
  static getCategories = async ({ data }) => await ApiRequest(`qb/categories`, 'POST', { data })
  static createCategory = async ({ data }) => await ApiRequest(`qb/category/create`, 'POST', { data })
  static editCategory = async ({ catId, data }) => await ApiRequest(`qb/category/${catId}/edit`, 'POST', { data })
  static viewCategory = async ({ catId }) => await ApiRequest(`qb/category/${catId}/view`, 'POST')
  static deleteCategory = async ({ catId }) => await ApiRequest(`qb/category/${catId}/delete`, 'DELETE')
  static uploadQuestionsInCategory = async ({ catId, data }) => await ApiRequest(`qb/questions/import/${catId}`, 'POST', { data })
  static addQuestionsToDifficulty = async ({ data }) => await ApiRequest(`qb/categories/add_to_questions`, 'POST', { data })
  static removeQuestionsFromCategory = async ({ data }) => await ApiRequest(`qb/categories/remove_from_questions`, 'POST', { data })

  /** DIFFICULTIES */
  static getDifficulties = async ({ data }) => await ApiRequest(`qb/difficulties`, 'POST', { data })
  static createDifficulty = async ({ data }) => await ApiRequest(`qb/difficulty/create`, 'POST', { data })
  static editDifficulty = async ({ diffId, data }) => await ApiRequest(`qb/difficulty/${diffId}/edit`, 'POST', { data })
  static viewDifficulty = async ({ diffId }) => await ApiRequest(`qb/difficulty/${diffId}/view`, 'POST')
  static deleteDifficulty = async ({ diffId }) => await ApiRequest(`qb/difficulty/${diffId}/delete`, 'DELETE')
  static addQuestionsToDifficulty = async ({ diffId, data }) => await ApiRequest(`qb/difficulty/${diffId}/add_to_questions`, 'POST', { data })
  static removeQuestionsFromDifficulty = async ({ diffId, data }) => await ApiRequest(`qb/difficulty/${diffId}/remove_from_questions`, 'POST', { data })

}
