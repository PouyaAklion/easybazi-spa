import * as types from '../mutation-types'

//State
export const state = {
    currentGame: {}
}

//getters
export const getters = {
    currentGame: state => state.currentGame
}


//mutations
export const mutations = {
    [types.UPDATE_CURRENT_GAME](state, {currentGame}) {
        state.currentGame=currentGame
    }
}

//actions

export const actions = {
    setCurrentGame({commit},currentGame){
        commit(types.UPDATE_CURRENT_GAME,{currentGame})
    }
}

