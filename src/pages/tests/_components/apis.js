import { ApiRequest } from 'src/lib/axios'

export default class TestApis {
  static getAllTests = async data => await ApiRequest('tests/list', 'POST', data)
  static addTest = async data => await ApiRequest('tests/add', 'POST', data)
  static editTest = async ({ id, data }) => await ApiRequest('tests/add/${id}', 'POST', data)
}
