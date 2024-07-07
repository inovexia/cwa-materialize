import API from 'src/pages/courses/_components/Apis'
import toast from 'react-hot-toast'

/** GET CONTENT */



/** ARRANGE CONTENT IN SECTION */
export async function ArrangeContent(sectionId) {
  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }
  const response = await API.arrangeContent(sectionId)
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
