import API from 'src/pages/courses/_components/Apis'
import toast from 'react-hot-toast'

/** GET SUBJECTS */

export async function ListSubjects(guid) {
  const response = await API.getSubjects(guid)
  if (!response.success) return toast.error(response.message)

  return response
}


/** CREATE SUBJECT */
export async function AddTest(data) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }
  const response = await API.createCourse({ data: formData })
  var responseMessage = await responseMessages(response.message)
  response.message = await responseMessage

  return response
}

/** CHANGE STATUS */
export async function changeStatus(subjectId, status) {
  const formData = new FormData()
  formData.append('status', status === "1" ? "0" : "1")
  const response = await API.statusSubject({ subjectId, data: formData })
  if (!response.success) return toast.error(response.message)
  toast.success(response.message)
}

/** CHANGE STATUS */
export async function changeBulkStatus(checked, id) {
  var testStatus = 0
  if (checked === true) {
    testStatus = 1
  } else {
    testStatus = 0
  }
  const formData = new FormData()
  formData.append('status', testStatus)
  const response = await API.statusSubject({ id, data: formData })
  if (!response.success) return toast.error(response.message)

  // var responseMessage = await responseMessages(response.message)
  // response.message = await responseMessage
  toast.success(response.message)
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
