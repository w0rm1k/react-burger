import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-aa5db.firebaseio.com/'
});

export default instance;