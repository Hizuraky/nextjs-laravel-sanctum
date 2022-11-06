import axios from 'axios'

const fetchSetting = (baseURL?: string) =>
  axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    responseType: 'json',
    timeout: 15 * 1000,
    withCredentials: true,
  })

export const apiClient = fetchSetting(process.env.NEXT_PUBLIC_API_ENDPOINT)
export const apiServer = fetchSetting(process.env.API_SERVER_ENDPOINT)
