import axios from 'axios';

export default{


    getAll(url){
        return axios.get(url)
        .then(response => {
            return response.data
        })
    },

    saveNewElement(url, payload){
        return axios.post(url+"/add", payload)
        .then(response => {
            return response.data
        })
    },

    addNewPort(url, payload){
        return axios.post(url, payload)
        .then(response => {
            return response.data
        })
    },

    addNewConnection(url, payload) {
        return axios.post(url, payload)
            .then(response => {
                return response.data
            })
    }
}