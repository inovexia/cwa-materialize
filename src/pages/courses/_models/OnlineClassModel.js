import API from 'src/pages/courses/_components/OnlineClass/Apis'
import MessageFormatter from 'src/lib/common/messageFormatter'

/** Create Online Class*/
export async function CreateOnlineClassCourse(guid, data) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }
  const response = await API.createOnlineClass({ guid, data: formData })

  response.message = await MessageFormatter(response.message)

  return response
}

/** All enroll user list */
export async function GetEnrolUserList(guid) {
  const response = await API.getUserEnrolList(guid)
  var responseMessage = await MessageFormatter(response.message)
  response.message = await responseMessage

  return response
}




/** All online class list in course */
export async function GetOnlineClassInCourse(guid, data) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }
  const response = await API.getOnlineClassInCourse({ guid, data })
  var responseMessage = await MessageFormatter(response.message)
  response.message = await responseMessage

  return response
}


/** All enroll user list */
export async function GetUnEnrolUserList(guid) {
  const response = await API.geUnEnrolUserList(guid)
  var responseMessage = await MessageFormatter(response.message)
  response.message = await responseMessage

  return response
}
/** Share Online Class */
export async function ShareOnlineClass(guid, data) {
  const formData = new FormData()
  console.log(data)
  data.length > 0 && data.map((value, index) => {
    formData.append('users[]', value)
  })
  const response = await API.shareToUser({ guid, data: formData })
  var responseMessage = await MessageFormatter(response.message)
  response.message = await responseMessage

  return response
}

/** Remove Online Class */
export async function RemoveOnlineClass(guid, data) {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    formData.append('meeting[]', value)
  })
  // if (typeof data === "object") {
  //   Object.entries(data).forEach(([key, value]) => {
  //     formData.append('meeting[]', value)
  //   })
  // }
  const response = await API.removeOnlineClass({ guid, data: formData })
  var responseMessage = await MessageFormatter(response.message)
  response.message = await responseMessage

  return response
}
/** Add Existing online class list in course */
export async function AddExistingOnlineClass(guid, data) {
  const formData = new FormData();

  data.length > 0 && data.map((item, index) => {
    formData.append(`meeting[]`, item);
    formData.append(`meeting[start_date]`, 'startDate');
    formData.append(`meeting[end_date]`, 'endDate');
  });

  const response = await API.addExistingOnlineClass({ guid, data: formData });
  var responseMessage = await MessageFormatter(response.message);
  response.message = await responseMessage;

  return response;
}


/** GET All Online Class */
export async function GetOnlineClasses(data) {

  const formData = new FormData()
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, val]) => {
      formData.append(key, val)
    })
  }
  const response = await API.getOnlineClasses(formData)
  var responseMessage = await MessageFormatter(response.message)
  response.message = await responseMessage

  return response
}
/** Change date online class */
export async function ChangeDateOnlineClass(guid, data) {
  const formData = new FormData();
  if (typeof data === "object") {
    Object.entries(data).forEach(([key, val]) => {
      formData.append(`meeting[]`, key);
      formData.append(`meeting[start_date]`, 'startDate');
      formData.append(`meeting[end_date]`, 'endDate');
    })
  }
  // data.length > 0 && data.map((item, index) => {
    
  // });

  const response = await API.getChangeDateOnlineClass({ guid, data: formData });
  var responseMessage = await MessageFormatter(response.message);
  response.message = await responseMessage;

  return response;
}