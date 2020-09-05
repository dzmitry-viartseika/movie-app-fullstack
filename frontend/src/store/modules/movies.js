import { SET_MOVIES_LIST } from '@/store/constants/mutations-types';

export default {
  state: {
    moviesList: [],
  },
  getters: {
    moviesList: (state) => state.moviesList,
  },
  mutations: {
    setMoviesList(state, data) {
      state.moviesList = data;
    },
  },
  action: {
    [SET_MOVIES_LIST](state, data) {
      state.moviesList = data;
    },
  },
};
