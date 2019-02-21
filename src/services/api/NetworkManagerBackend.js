import axios from 'axios';

export default{
    
    getAll(url){
        return axios.get("http://localhost:8090/api"+url)
        .then(response => {
            return response.data
        })
    },

    saveNewElement(url, payload){
        return axios.post("http://localhost:8090/api/"+url+"/add", payload)
        .then(response => {
            return response.data
        })
    }
}