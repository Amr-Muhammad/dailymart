import { createStore } from "vuex";

let store = createStore({
    state: {
        loggedUserId: null,
        loggedUserData: null,
        isDataLoading: true,
        forgotPasswordEmail: null,
        userOTP: null

    },
    mutations: {
        SETUSERDATA(state, loggedUser) {
            state.loggedUserId = loggedUser[0]
            state.loggedUserData = loggedUser[1]
            localStorage.setItem('userId', loggedUser[0])
            localStorage.setItem('role', loggedUser[1].role)
        },
        LOGOUT(state) {
            state.loggedUserId = null
            state.loggedUserData = null
            localStorage.removeItem('userId')
            localStorage.removeItem('role')
        },
        SAVEEMAIL(state, email) {
            state.forgotPasswordEmail = email
        },
        SETUSEROTP(state, userOTP) {
            state.userOTP = userOTP
        }
    },
    actions: {
        async setUserData({ commit }, loggedUser) {
            commit('SETUSERDATA', loggedUser)
        },
        async logout({ commit }) {
            commit('LOGOUT')
        },
        forgetPasswordEmail({ commit }, email) {
            commit('SAVEEMAIL', email)
        },
        setUserOTP({ commit }, userOTP) {
            commit('SETUSEROTP', userOTP)
        }
    },
    getters: {
        getUserId: state => state.loggedUserId
    }
})


export default store