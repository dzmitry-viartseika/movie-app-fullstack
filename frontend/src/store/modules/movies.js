import * as types from '@/store/constants/mutations-types';

const state = {
  moviesList: [],
  currentPage: 1,
  totalPage: 0,
};

const getters = {
  moviesList: (state) => state.moviesList,
  currentPage: (state) => state.currentPage,
  totalPage: (state) => state.totalPage,
};

const actions = {
  setMoviesList({ commit }, data) {
    commit(types.SET_MOVIES_LIST, data);
  },
  setTotalPage({ commit }, data) {
    commit(types.SET_TOTAL_PAGE, data);
  },
  setCurrentPage({ commit }, data) {
    commit(types.SET_CURRENT_PAGE, data);
  },
};

const mutations = {
  [types.SET_MOVIES_LIST](state, data) {
    state.moviesList = data;
  },
  [types.SET_TOTAL_PAGE](state, data) {
    state.totalPage = data;
  },
  [types.SET_CURRENT_PAGE](state, data) {
    state.currentPage = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
