import store from '../store/'

export default async (to, from, next) => {
	next()
  // if (!store.getters['auth/check']) {
  //   next({ name: 'home' })
  // } else {
  //   next()
  // }
}
