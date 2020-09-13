export const CURRENT_SERVER = window.location.hostname === 'localhost'
  ? 'http://localhost:3000/'
  : `${window.location.protocol}//${window.location.hostname}/`;
export const MOVIES_API = `${CURRENT_SERVER}movies`;
export const UPLOAD_API = `${CURRENT_SERVER}uploads`;
