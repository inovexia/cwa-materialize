import { ApiRequest } from 'src/lib/axios'

export default class TestApis {
  static getAllTests = async data => await ApiRequest('tests/list')
}

