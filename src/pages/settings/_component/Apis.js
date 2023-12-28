import { ApiRequest } from 'src/lib/apis/axios'

export default class SettingsApi {

  // Color Settings
  static ThemeColorPost = async data => await ApiRequest(`/settings/general/save_theme`, 'POST', { data })
  // Color Settings
  static ThemeColorGet = async data => await ApiRequest(`/settings/general/get_theme`, 'POST', { data })
  // Single Device Settings for post
  static SingleDevice = async data => await ApiRequest(`/settings/login/common`, 'POST', { data })
  // Single Device Settings for Get
  static SingleDeviceGet = async data => await ApiRequest(`/settings/login/common`, 'Get', { data })
}
