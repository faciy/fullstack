import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObjet => {
    return axios.post(baseUrl, newObjet)
}

const update = (id, newObjet) => {
    return axios.put(`${baseUrl}/${id}`, newObjet)
}


const suppr = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { 
    getAll,
    create,
    update, 
    suppr
}