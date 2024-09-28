import { createStore } from "vuex";

let store = createStore({
    state: {
        loggedUserId: null,
        loggedUserData: null,
        isDataLoading: true

    },
    mutations: {
        SETUSERDATA(state, loggedUser) {
            state.loggedUserId = loggedUser[0]
            state.loggedUserData = loggedUser[1]
            localStorage.setItem('userId', loggedUser[0])
        },
        LOGOUT(state) {
            state.loggedUserId = null
            state.loggedUserData = null
            localStorage.removeItem('userId')
        }
    },
    actions: {
        async setUserData({ commit }, loggedUser) {
            commit('SETUSERDATA', loggedUser)
        },
        async logout({ commit }) {
            commit('LOGOUT')
        }
    },
    getters: {
        getUserId: state => state.loggedUserId
    }
})


export default store