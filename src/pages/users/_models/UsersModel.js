import API from 'src/pages/users/_components/apis'
import MessageFormatter from 'src/lib/common/MessageFormatter'

/** GET USERS */
export async function GetUsers(data) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, val]) => {
      formData.append(key, val)
    })
  }
  const response = await API.filterUsers(formData)
  var responseMessage = await MessageFormatter(response.message)
  response.message = await responseMessage

  return response
}


/** CREATE USERS */
export async function AddUser(data) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }
  const response = await API.createUser({ data: formData })
  var responseMessage = await responseMessages(response.message)
  response.message = await responseMessage

  return response
}

/** EDIT USER */
export async function EditUser(id, data) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }
  const response = await API.updateUser({ id, data: formData })
  var responseMessage = await responseMessages(response.message)
  response.message = await responseMessage

  return response
}
