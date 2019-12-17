import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://canx-burger-builder.firebaseio.com/',
});

export default instance;
