export const ApiRequest = async (url, method, data) => {
  try {
    const response = await fetch(process.env.CAAPIS_BASE_URL + url, {
      method: method,
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      body: data // body data type must match "Content-Type" header
    })

    return response.json()
  } catch (error) {
    console.log(error)
  }
}
