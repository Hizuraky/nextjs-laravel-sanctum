import { apiClient } from '@/utils/apiClient'

export const fetcherGet = async (url: string) =>
  apiClient
    .get(url)
    .then((res) => {
      return res
    })
    .catch((err) => {
      if (err?.message.startsWith('Network Error')) err.response = { message: 'Network Error' }
      throw err.response
    })

export const fetcherPost = <T>(url: string, body: Object = {}) =>
  apiClient
    .post<T>(url, JSON.stringify(body))
    .then((res) => {
      return { data: res.data, err: undefined }
    })
    .catch((err) => {
      return { data: null, err: err.response }
    })

export const fetcherPut = <T>(url: string, body: Object = {}) =>
  apiClient
    .put<T>(url, body)
    .then((res) => {
      return { data: res, err: undefined }
    })
    .catch((err) => {
      return { data: undefined, err: err.response }
    })
