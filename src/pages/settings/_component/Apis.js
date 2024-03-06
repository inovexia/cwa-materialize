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

  // Required Settings for Post
  static RequiredPost = async data => await ApiRequest(`/settings/registration/valid_fields`, 'POST', { data })

  // Required Settings for Get
  static RequiredGet = async data => await ApiRequest(`/settings/registration/valid_fields`, 'Get', { data })
}
