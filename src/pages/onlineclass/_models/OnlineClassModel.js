import API from 'src/pages/onlineclass/_components/Apis'
import MessageFormatter from 'src/lib/common/MessageFormatter'

/** GET TESTS */
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
