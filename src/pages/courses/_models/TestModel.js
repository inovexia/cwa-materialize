import API from 'src/pages/tests/_components/apis'
import CAPI from 'src/pages/courses/_components/Apis'
import MessageFormatter from 'src/lib/common/MessageFormatter'

/** GET TESTS */
export async function ListTests({ guid, data }) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, val]) => {
      formData.append(key, val)
    })
  }
  const response = await CAPI.filterTest({ guid, data: formData })
  var responseMessage = await responseMessages(response.message)
  response.message = await responseMessage

  return response
}


/** CREATE TEST */
export async function AddTest({ guid, data }) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }
  const response = await CAPI.createTest({ guid, data: formData })
  var responseMessage = await responseMessages(response.message)
  response.message = await responseMessage

  return response
}

/**TEST SETTINGS */
export async function TestSetting({ guid, data }) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }
  const response = await CAPI.testSetting({ guid, data: formData })
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

/** CREATE QUESTION */
export async function createQuestion({ guid, data }) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'choices') {
        value.map((choice, i) => {
          if (choice.choice) {
            formData.append(`choice[${i}]`, choice.choice)
            formData.append(`correct_answer[${i}]`, choice.correct_answer === undefined ? "0" : "1")
            formData.append(`order[${i}]`, i)
          }
        })
      } else {
        formData.append(key, value)
      }
    })
  }
  const response = await CAPI.addQuestion({ guid, data: formData })

  response.message = await MessageFormatter(response.message)

  return response
}

/** EDIT QUESTION */
export async function EditQuestion(guid, qid, data) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'choices') {
        value.map((choice, i) => {
          formData.append(`choice[${i}]`, choice.choice)
          formData.append(`correct_answer[${i}]`, choice.correct_answer)
          formData.append(`order[${i}]`, choice.position)
        })
      } else {
        formData.append(key, value)
      }
    })
  }
  const response = await CAPI.updateQuestion({ guid, qid, data: formData })
  var responseMessage = await MessageFormatter(response.message)
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
