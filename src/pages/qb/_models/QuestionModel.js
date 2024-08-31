import API from 'src/pages/qb/_components/Apis'
// import MessageFormatter from 'src/lib/common/MessageFormatter'
import MessageFormatter from 'src/lib/common/messageFormatter'
/** GET TESTS */
export async function GetQuestions(data) {

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
      if (key === 'choices') {
        value.map((choice, i) => {
          if (choice.choice) {
            formData.append(`choice[${i}]`, choice.choice)
            formData.append(`correct_answer[${i}]`, choice.correct_answer)
            formData.append(`order[${i}]`, i)
          }
        })
      } else {
        formData.append(key, value)
      }
    })
  }
  const response = await API.addQuestion({ data: formData })

  response.message = await MessageFormatter(response.message)

  return response
}

/** UPLOAD QUESTION */
export async function UploadQuestions(files) {

  const formData = new FormData()
  files.length > 0 && files.map((file) => {
    formData.set("userfile", file)
  })
  const response = await API.uploadQuestions({ data: formData })

  response.message = await MessageFormatter(response.message)

  return response
}

/** EDIT QUESTION */
export async function EditQuestion(guid, data) {

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
  const response = await API.editQuestion({ guid, data: formData })
  var responseMessage = await MessageFormatter(response.message)
  response.message = await responseMessage

  return response
}

/** VIEW QUESTION */
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

/** EDIT QUESTION */
export async function DeleteQuestion(guid) {

  const response = await API.deleteQuestion({ guid })
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
