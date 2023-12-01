// api/axios.js
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CAAPIS_BASE_URL,
  timeout: 10000,
  headers: {
    Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_CAAPIS_TOKEN,
    Network: process.env.NEXT_PUBLIC_CAAPIS_NETWORK_ID,
    Cookie: process.env.NEXT_PUBLIC_CAAPIS_SESSION_ID
  }
})

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // You can add headers, authentication tokens, or any other request-related logic here.
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  response => {
    // You can add global response handling here.
    return response
  },
  error => {
    // You can handle error responses globally, such as token expiration or other common errors.
    return Promise.reject(error)
  }
)

export const ApiRequest = async (url, method, config) => {
  try {
    const response = await axiosInstance({ url, method: method, ...config })

    return response.data
  } catch (err) {
    return (
      err.response?.data ?? {
        success: false,
        message: err.code === 'ECONNABORTED' ? 'Network error, check internet connection.' : err.message
      }
    )
  }
}
