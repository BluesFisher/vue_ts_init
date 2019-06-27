// tslint:disable:no-shadowed-variable
import { IAuthState } from '../index.d';

// initial state
const state: IAuthState = {
    token: '21'
};

// getters
const getters = {};

// actions
const actions = {
    setToken({ commit, state }: any, newState: IAuthState) {
        console.log('vuex/auth/setToken', newState);
        commit('setToken', newState.token || '');
    }
};

// mutations
const mutations = {
    setToken: (state: IAuthState, token: string) => {
        state.token = token;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
