import * as domain from '@/api/constants/domain';

const axios = require('axios');

export default {
  getMoviesList() {
    const instWithCred = axios.create({
      baseURL: domain.MOVIES_API,
    });
    return instWithCred.get('/getMoviesList');
  },
  addNewMovie(movie) {
    const instWithCred = axios.create({
      baseURL: domain.MOVIES_API,
    });
    return instWithCred.post('/newItem', { movie });
  },
  deleteMovie(id) {
    const instWithCred = axios.create({
      baseURL: domain.MOVIES_API,
    });
    return instWithCred.delete(`/deleteItem/?id=${id}`);
  },
  updateMovie(movie) {
    const instWithCred = axios.create({
      baseURL: domain.MOVIES_API,
    });
    return instWithCred.patch(`changeItem/?id=${movie._id}`, { movie });
  },
  getPaginatedMovies(page = 1, limit = 10) {
    const instWithCred = axios.create({
      baseURL: domain.MOVIES_API,
    });
    return instWithCred.get(`getPaginatedMovies/?page=${page}&limit=${limit}`);
  },
};
