import axios from 'axios';

export default{

    async get(url){
        return axios.get(url)
        .then(response => {
            return response.data
        })
    },

    async post(url, payload){
        const response = await axios.post(url, payload);
        return response.data;
    }
}