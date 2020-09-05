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
    console.log('movie', movie);
    const instWithCred = axios.create({
      baseURL: domain.MOVIES_API,
    });
    return instWithCred.post('/newItem', { movie });
  },
};
