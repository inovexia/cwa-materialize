import { ApiRequest } from 'src/lib/apis/axios'

export default class OnlineClassApis {

  static getAllOnlineClassList = async data => await ApiRequest('zoom/list', 'POST', { data })
  static addOnlineClass = async ({ data }) => await ApiRequest('zoom/create', 'POST', { data })
  static deleteOnlineClass = async ({ guid }) => await ApiRequest(`zoom/delete/${guid}`, 'DELETE')


  static editQuestion = async ({ guid, data }) => await ApiRequest(`qb/questions/${guid}/update`, 'POST', { data })
  static uploadQuestions = async ({ data }) => await ApiRequest(`qb/questions/import`, 'POST', { data })
  static viewQuestion = async ({ guid }) => await ApiRequest(`qb/questions/${guid}/view`, 'POST')
  static bulkDeleteQuestions = async ({ data }) => await ApiRequest(`qb/questions/delete`, 'POST', { data })



}
