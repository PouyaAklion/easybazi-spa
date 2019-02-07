import store from '../store/'

export default (to, from, next) => {
  if (store.getters['auth/isAdmin'] == 0) {
    console.log("isAdmin")
    next({ name: 'welcome' })
  } else {
    next()
  }
}
