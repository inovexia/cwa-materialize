import API from 'src/pages/qb/_components/Apis'
import MessageFormatter from 'src/lib/common/messageFormatter'

/** GET TESTS */
export async function ListQuestions(data) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, val]) => {
      formData.append(key, val)
    })
  }
  const response = await API.getAllQuestions(formData)
  var responseMessage = await MessageFormatter(response.message)
  response.message = await responseMessage

  return response
}


/** CREATE QUESTION */
export async function AddQuestion(data) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }
  const response = await API.addQuestion({ data: formData })
  var responseMessage = await MessageFormatter(response.message)
  response.message = await responseMessage

  return response
}

/** EDIT QUESTION */
export async function ViewQuestion(guid, data) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }
  const response = await API.viewQuestion({ guid, data: formData })
  var responseMessage = await MessageFormatter(response.message)
  response.message = await responseMessage

  return response
}

/** CHANGE STATUS */
export async function ChangeStatus(checked, guid) {
  var testStatus = 0
  if (checked === true) {
    testStatus = 1
  } else {
    testStatus = 0
  }
  const formData = new FormData()
  formData.append('status', testStatus)
  const response = await API.changeStatus({ guid, data: formData })
  var responseMessage = await MessageFormatter(response.message)
  response.message = await responseMessage

  return response
}


/** GET CATEGORIES */
export async function GetCategories() {
  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }
  const response = await API.getCategories({ data: formData })
  var responseMessage = await MessageFormatter(response.message)
  response.message = await responseMessage

  return response
}

