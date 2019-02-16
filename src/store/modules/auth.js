import axios from 'axios'
import Cookies from 'js-cookie'
import * as types from '../mutation-types'

// state
export const state = {
	user: null,
	isAdmin: 0,
	token: Cookies.get('token')
}

// getters
export const getters = {
	user: state => state.user,
	token: state => state.token,
	check: state => state.user !== null,
	isAdmin: state => state.isAdmin
}

// mutations
export const mutations = {
	[types.SAVE_TOKEN](state, { token, remember }) {
		state.token = token
		Cookies.set('token', token, { expires: remember ? 365 : null })
	},

	[types.FETCH_USER_SUCCESS](state, { user }) {
		state.user = user.data.user
		if (user.data.is_admin) {
			state.isAdmin = user.data.is_admin
		}
	},

	[types.FETCH_USER_FAILURE](state) {
		state.token = null
		Cookies.remove('token')
	},

	[types.LOGOUT](state) {
		state.user = null
		state.token = null
		state.isAdmin = 0
		Cookies.remove('token')
	},

	[types.UPDATE_USER](state, { user }) {
		state.user = user
	}
}

// actions
export const actions = {
	saveToken({ commit, dispatch }, payload) {
		commit(types.SAVE_TOKEN, payload)
	},

	async fetchUser({ commit }) {
		try {

			const { data } = await axios.get('/user')
			commit(types.FETCH_USER_SUCCESS, { user: data })
		} catch (e) {
			commit(types.FETCH_USER_FAILURE)
		}
	},

	updateUser({ commit }, payload) {
		commit(types.UPDATE_USER, payload)
	},

	async logout({ commit }) {
		try {
			await axios.get('/logout')
		} catch (e) {
		}

		commit(types.LOGOUT)
	},

	async fetchOauthUrl(ctx, { provider }) {
		const { data } = await axios.post(`/api/oauth/${provider}`)

		return data.url
	}
}
