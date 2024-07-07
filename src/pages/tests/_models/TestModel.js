import API from 'src/pages/tests/_components/apis'

/** GET TESTS */
export async function ListTests(data) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, val]) => {
      formData.append(key, val)
    })
  }
  const response = await API.getAllTests(formData)
  var responseMessage = await responseMessages(response.message)
  response.message = await responseMessage

  return response
}


/** CREATE TEST */
export async function AddTest(data) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }
  const response = await API.addTest({ data: formData })
  var responseMessage = await responseMessages(response.message)
  response.message = await responseMessage

  return response
}

/** EDIT TEST */
export async function EditTest(data) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }
  const response = await API.editTest({ data: formData })
  var responseMessage = await responseMessages(response.message)
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
  var responseMessage = await responseMessages(response.message)
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
