import constants from '@/constants/constants'
import axios from 'axios'

const instance = axios.create({
  baseURL: constants.api.POKE_API_URL
})

instance.interceptors.request.use((request) => {
  console.log(`Starting Request ${request.method.toUpperCase()} ${request.url}`)
  return request
})

instance.interceptors.response.use(
  (response) => {
    console.log(`Received Response ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    console.error(`Error ${error.response?.status} ${error.response?.config.url}`, error)
    return Promise.reject(error)
  }
)

export default instance
