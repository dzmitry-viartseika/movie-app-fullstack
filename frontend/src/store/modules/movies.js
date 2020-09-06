import * as types from '@/store/constants/mutations-types';

const state = {
  moviesList: [],
};

const getters = {
  moviesList: (state) => state.moviesList,
};

const actions = {
  setMoviesList({ commit }, data) {
    console.log('store', data);
    commit(types.SET_MOVIES_LIST, data);
  },
};

const mutations = {
  [types.SET_MOVIES_LIST](state, data) {
    state.moviesList = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
