import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        testPlayerCash: [],
        playerStartCash: 100,
        startCash: '',
        playerName: '',
    },
    getters: {
        getPlayerCash: state => {
            return state.testPlayerCash
        },
        getPlayerStartCash: state => {
            return state.playerStartCash
        },
        getStartCash: state => {
            return state.startCash
        },
        getPlayerName: state => {
            return state.playerName
        }
    },
    mutations: {
        addPlayerCashFirst(state, firstBingoPrice) {
            state.testPlayerCash.push(firstBingoPrice);
        },
        updatePlayerName(state, payload) {
            state.playerName = payload.updatedPlayerName
        },
        updatePlayerCash(state, payload) {
            state.startCash = payload.updatedPlayerCash
        }
    },
    actions: {
        updatePlayerName(context, payload) {
            context.commit('updatePlayerName', payload);
        },
        updatePlayerCash(context, payload) {
            context.commit('updatePlayerCash', payload);
        }
    },
    modules: {}
})