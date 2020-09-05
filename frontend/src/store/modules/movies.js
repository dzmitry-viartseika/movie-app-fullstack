import * as types from '@/store/constants/mutations-types';

const state = {
  moviesList: [],
};

const getters = {
  moviesList: (state) => state.moviesList,
};

const actions = {
  setMoviesList({ commit }, data) {
    commit(types.SET_ALL_COUNTRIES_LIST, data);
  },
};

const mutations = {
  [types.SET_ALL_COUNTRIES_LIST](state, data) {
    state.setMoviesList = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
