const axios = require('axios');

export default {
  getMoviesList() {
    const instWithCred = axios.create({
      baseURL: process.env.VUE_APP_API_URL,
    });
    return instWithCred.get('/', {
      params: {
        apikey: process.env.VUE_APP_API_KEY,
      },
    });
  },
};
