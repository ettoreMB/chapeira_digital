import toast from '@/utils/toast'
import axios, { AxiosError } from 'axios'
import Router from 'next/router'
import { destroyCookie, parseCookies } from 'nookies'
const cookies = parseCookies()
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${cookies['@chapeiraDigital_token']}`,
  },
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      destroyCookie(undefined, '@chapeiraDigital_token', {
        path: '/',
      })
      const { loja } = Router.query
      Router.push(`/${loja}/admin/auth`)
      toast({ text: 'Não autorizado', type: 'danger' })
    }

    return Promise.reject(error)
  },
)

api.interceptors.request.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)
