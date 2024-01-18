import API from 'src/pages/onlineclass/_components/Apis'
import MessageFormatter from 'src/lib/common/messageFormatter'

/** GET Online Class */
export async function GetOnlineClass(data) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, val]) => {
      formData.append(key, val)
    })
  }
  const response = await API.getAllOnlineClassList(formData)
  var responseMessage = await MessageFormatter(response.message)
  response.message = await responseMessage

  return response
}
/** Create Online Class*/
export async function AddOnlineClass(data) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }
  const response = await API.addOnlineClass({ data: formData })

  response.message = await MessageFormatter(response.message)

  return response
}

/** Delete Online Class */
export async function DeleteOnlineClass(guid) {

  const response = await API.deleteOnlineClass({ guid })
  var responseMessage = await MessageFormatter(response.message)
  response.message = await responseMessage

  return response
}

/** EDIT Online Class */
export async function EditOnlineClass(guid, data) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'editClass') {
        value.map((choice, i) => {
          formData.append(`title[${i}]`, editClass.title)
          formData.append(`details[${i}]`, editClass.details)
          formData.append(`created_by[${i}]`, editClass.created_by)
        })
      } else {
        formData.append(key, value)
      }
    })
  }
  const response = await API.editOnlineClass({ guid, data: formData })
  var responseMessage = await MessageFormatter(response.message)
  response.message = await responseMessage

  return response
}

/** VIEW Online Class */
export async function ViewOnlineClass(guid, data) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }
  const response = await API.viewOnlineClass({ guid, data })
  var responseMessage = await MessageFormatter(response.message)
  response.message = await responseMessage

  return response
}

/** All User List */
export async function GetUser(data) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, val]) => {
      formData.append(key, val)
    })
  }
  const response = await API.getAllUsers(formData)
  var responseMessage = await MessageFormatter(response.message)
  response.message = await responseMessage

  return response
}

/** Share Online Class */
export async function ShareOnlineClass(guid, data) {
  const formData = new FormData()
  console.log(data)
  data.length > 0 && data.map((value, index) => {
    formData.append('users[]', value)
  })
  const response = await API.shareToUser({ guid, data: formData })
  var responseMessage = await MessageFormatter(response.message)
  response.message = await responseMessage

  return response
}

/** All enroll user list */
export async function GetEnrolUserList(guid) {
  const response = await API.getUserEnrolList(guid)
  var responseMessage = await MessageFormatter(response.message)
  response.message = await responseMessage

  return response
}

