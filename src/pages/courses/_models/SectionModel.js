import API from 'src/pages/courses/_components/Apis'
import toast from 'react-hot-toast'


/** CREATE SECTION */
export async function AddSection(lessonId, data) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }
  const response = await API.createSection({ lessonId, data: formData })
  var responseMessage = await responseMessages(response.message)
  response.message = await responseMessage

  return response
}

/** Preview Section */
export async function SecPreview(sectionId) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, val]) => {
      formData.append(key, val)
    })
  }
  const response = await API.previewSection(sectionId && sectionId)
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
