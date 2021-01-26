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

// eslint-disable-next-line import/no-anonymous-default-export
export default { 
    getAll,
    create,
    update, 
    suppr
}