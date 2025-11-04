import useLocation from '@hooks/useLocation'
import ax from 'axios'
import Cookies from 'js-cookie'
import qs from 'qs'

const API_URL = import.meta.env.VITE_API_URL

export const API_SERVER: string = API_URL || 'https://ai-poster-api-staging.hi-lab.ai'

const axios = ax.create({
  baseURL: `${API_SERVER}/api/`,
  withCredentials: false,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    // 'Access-Control-Max-Age': 0,
    // 'Cache-Control': 'no-cache',
  },
})

const location = useLocation()
const prefix: any = location.pathname?.slice(1).split('/')[0] || ''
const token: any = Cookies.get(`token_${prefix}`)

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

axios.interceptors.request.use(
  (req: any) => {
    if (req.method === 'get' && req?.params) {
      req.paramsSerializer = () =>
        qs.stringify(req.params, {
          encode: false,
          arrayFormat: 'brackets',
          indices: false,
          strictNullHandling: true,
          skipNulls: true,
        })
    }

    return req
  },
  (error: any) => Promise.reject(error)
)
axios.interceptors.response.use(
  (res: any) => res,
  (error: any) => {
    if (error?.response?.status === 401) {
      const guardedItems: Array<string> = ['ally-supports-cache']

      Object.keys(localStorage)
        .filter((x: any) => !guardedItems.includes(x))
        .forEach((item: any) => {
          localStorage.removeItem(item)
        })

      if (token) {
        Cookies.remove(`token_${prefix}`)
        // window.location.reload()
      }
    }

    return Promise.reject(error)
  }
)

export default axios
