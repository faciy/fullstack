import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObjet => {
    return axios.post(baseUrl, newObjet)
}

// const update = (id, newObject) => {
//     return axios.put(`${baseUrl}/${id}`, newObject)
//   }

export default { getAll, create }