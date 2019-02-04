import axios from 'axios'
import store from '../store/'
import router from '../routes/'
import swal from 'sweetalert2'

//Global Headers
axios.defaults.baseURL = process.env.BASE_API_URL || 'http://192.168.1.7/izi-bazi.ud/api';


//csrf-token
axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
};
// Request interceptor

axios.interceptors.request.use(request => {
  const token = store.getters['auth/token']
  if (token) {
    request.headers.common['Authorization'] = `Bearer ${token}`
    // request.headers.common['Content-Type'] = 'multipart/form-data'
  }

  const locale = store.getters['lang/locale']
  if (locale) {
    request.headers.common['Accept-Language'] = locale
  }

  // request.headers['X-Socket-Id'] = Echo.socketId()

  return request
})

// Response interceptor
axios.interceptors.response.use(response => response, error => {
  console.log(error)
  const { status } = error.response

  if (status >= 500) {
      swal({
          type: 'error',
          title: 'خطا',
          text: 'مشکل در برقراری ارتباط با سرور',
          focusConfirm: false,
          confirmButtonColor: '#d65611',
          confirmButtonText: 'باشه',
      })
  }

  if (status === 401 && store.getters['auth/check']) {
      swal({
          type: 'error',
          title: 'خطا',
          text: 'مشکل در برقراری ارتباط با سرور',
          focusConfirm: false,
          confirmButtonColor: '#d65611',
          confirmButtonText: 'باشه',
      }).then(() => {
      store.commit('auth/LOGOUT')

      router.push({ name: 'login' })
    })
  }

  return Promise.reject(error)
})