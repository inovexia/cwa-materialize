import API from 'src/pages/courses/_components/Apis'
import toast from 'react-hot-toast'

/** GET CATEGORY */
export async function ListCategory(data) {
  console.log(data)
  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, val]) => {
      formData.append(key, val)
    })
  }
  const response = await API.courseCategory(formData)
  var responseMessage = await responseMessages(response.message)
  response.message = await responseMessage

  return response
}




const responseMessages = (message) => {
  var responseMessage = ''
  if (typeof message === "object") {
    Object.entries(message).forEach(([key, val]) => {
      responseMessage += message[key] + '\n'
    })
  } else {
    responseMessage = message
  }

  return responseMessage
}
