import { ApiRequest } from 'src/lib/apis/axios'

export default class OnlineClassApis {

  // Create Online Class
  static createOnlineClass = async ({ guid, data }) => await ApiRequest(`course/zoom/create_meeting/${guid}`, 'POST', { data })

  // get online Class in the course
  static getOnlineClassInCourse = async ({ guid, data }) => await ApiRequest(`course/zoom/get_meetings/${guid}`, 'POST', { data })

  // change date of online class in course
  static getChangeDateOnlineClass = async ({ guid, data }) => await ApiRequest(`course/zoom/change_dates/${guid}`, 'POST', { data })
  static geUnEnrolUserList = async (guid) => await ApiRequest(`course/notenroled/${guid}`, 'POST')

  // Share online class to user
  static shareToUser = async ({ guid, data }) => await ApiRequest(`zoom/share/${guid}`, 'POST', { data })

  // Remove Online Class
  static removeOnlineClass = async ({ guid, data }) => await ApiRequest(`course/zoom/remove_meetings/${guid}`, 'POST', { data })

  // Change Date Online Class
  static changeDateOnlineClass = async ({ guid, data }) => await ApiRequest(`course/zoom/change_dates/${guid}`, 'POST', { data })

  // get All online Class out of course
  static getOnlineClasses = async ({ guid, data }) => await ApiRequest(`zoom/list`, 'POST', { data })

  // Change Date Online Class
  static addExistingOnlineClass = async ({ guid, data }) => await ApiRequest(`course/zoom/add_meeting/${guid}`, 'POST', { data })
}
