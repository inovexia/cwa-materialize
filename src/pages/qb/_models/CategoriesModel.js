import API from 'src/pages/qb/_components/Apis'
// import MessageFormatter from 'src/lib/common/MessageFormatter'
import MessageFormatter from 'src/lib/common/messageFormatter'
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


/** CREATE CATEGORY */
export async function AddCategory(data) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }
  const response = await API.createCategory({ data: formData })

  response.message = await MessageFormatter(response.message)

  return response
}


/** EDIT CATEGORY */
export async function EditCategory(guid, data) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }
  const response = await API.editCategory({ guid, data: formData })
  var responseMessage = await MessageFormatter(response.message)
  response.message = await responseMessage

  return response
}

/** VIEW CATEGORY */
export async function ViewCategory(guid, data) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }
  const response = await API.viewCategory({ guid, data: formData })
  var responseMessage = await MessageFormatter(response.message)
  response.message = await responseMessage

  return response
}

/** DELETE CATEGORY */
export async function DeleteCategory(guid) {

  const response = await API.deleteCategory({ guid })
  var responseMessage = await MessageFormatter(response.message)
  response.message = await responseMessage

  return response
}

/** UPLOAD QUESTIONS */
export async function UploadQuestions(guid, files) {

  const formData = new FormData()
  files.length > 0 && files.map((file) => {
    formData.set("userfile", file)
  })
  const response = await API.uploadQuestionsInCategory({ guid, data: formData })

  response.message = await MessageFormatter(response.message)

  return response
}
