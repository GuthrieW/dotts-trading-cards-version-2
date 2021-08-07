// request.js
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from './constants'

// optionaly add base url
const client = axios.create()
const ISSERVER = typeof window === 'undefined'

const request = ({ ...options }) => {
  if (!ISSERVER) {
    client.defaults.headers.common.Authorization =
      'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN)
  }

  const onSuccess = (response) => response
  const onError = (error) => {
    // optionaly catch errors and add some additional logging here
    return error
  }

  return client(options).then(onSuccess).catch(onError)
}

export default request
