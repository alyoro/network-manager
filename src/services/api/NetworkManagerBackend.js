import axios from 'axios';
import FileSaver from 'file-saver';

export default {

    async get(url) {
        if (localStorage.getItem('token')) axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        return axios.get(url)
            .then(response => {
                return response.data;
            })
    },

    async post(url, payload) {
        if (localStorage.getItem('token')) axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        const response = await axios.post(url, payload);
        return response.data;
    },

    async put(url, payload) {
        if (localStorage.getItem('token')) axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        const response = await axios.put(url, payload);
        return response.data;
    },

    async patch(url) {
        if (localStorage.getItem('token')) axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        const response = await axios.patch(url);
        return response.data;
    },

    async delete(url) {
        if (localStorage.getItem('token')) axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        const response = await axios.delete(url);
        return response;
    },

    async getWithDownloadFile(url) {
        axios.get(url, { responseType: 'blob' }).then((response) => {
            const fileNameHeader = "content-disposition";
            const suggestedFileName = response.headers[fileNameHeader];
            const effectiveFileName = (suggestedFileName === undefined ? "report.csv" : suggestedFileName);

            FileSaver.saveAs(response.data, effectiveFileName);
        }).catch((error) => {
            console.error("Error during download", response);
            return error
        })
    }
}