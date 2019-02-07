import * as type from '../mutation-types'

//State
export const state = {
    isShowLoginForm:false,
    isShowSideBar:false,
}
//geters
export const getters = {
    isShowLoginForm: state => state.isShowLoginForm,
    isShowSideBar: state => state.isShowSideBar
}
//mutations
export const mutations = {
    [type.SHOW_SING_FORM] (state) {
        state.isShowLoginForm=!state.isShowLoginForm;

    },
    [type.TOGGLE_SIDEBAR] (state) {
        state.isShowSideBar=!state.isShowSideBar;

    }
}

//actions
export const actions = {
    showSingForm ({commit}){
        commit(type.SHOW_SING_FORM);
    }
}