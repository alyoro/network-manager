import axios from 'axios';

export default {

    async get(url) {
        return axios.get(url)
            .then(response => {
                return response.data;
            })
    },

    async post(url, payload) {
        const response = await axios.post(url, payload);
        return response.data;
    },

    async put(url, payload) {
        const response = await axios.put(url, payload);
        return response.data;
    },

    async patch(url) {
        const response = await axios.patch(url);
        return response.data;
    },

    async delete(url) {
        const response = await axios.delete(url);
        return response;
    }
}