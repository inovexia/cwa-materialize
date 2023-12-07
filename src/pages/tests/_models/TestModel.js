import TestApis from 'src/pages/tests/_components/Apis'

function responseMessages (message) {
   var responseMessage = ''
   if (typeof message === "object") {
      Object.entries (message).forEach (([key, val]) => {
        responseMessage += message[key] + '\n'
      })
    } else {
      responseMessage = response.message
    }

    return responseMessage
}

export async function getAllTests () {

   try {

    const formData = new FormData ()

    const response = await TestApis.getAllTests()

    var responseMessage = responseMessages (response.message)
    alert (responseMessage)

    const result = {
      status : response.status,
      message : responseMessage
    }

    return result

  } catch (error) {
    console.error('Server Error:', error);

    //throw new Error('Failed to fetch revenue data.');
  }




}


export async function changeStatus (checked, guid) {
  var testStatus = 0
  if (checked === true) {
    testStatus = 1
  } else {
    testStatus = 0
  }
  const formData = new FormData ()

  formData.append ('status', testStatus)
  const response = await TestApis.changeStatus({guid, data: formData})

  var responseMessage = ''
  if (typeof response.message === "object") {
    Object.entries (response.message).forEach (([key, val]) => {
      responseMessage += response.message[key] + '\n'
    })
  } else {
    responseMessage = response.message
  }

  const result = {
    status : response.status,
    message : responseMessage
  }

  return result
}
