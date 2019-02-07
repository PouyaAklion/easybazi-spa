import store from '../store/'

export default async (to, from, next) => {

  if (!store.getters['auth/check'] && to.name!=='welcome') {
    next({name:'welcome'})
  } else {
    next()
  }
}