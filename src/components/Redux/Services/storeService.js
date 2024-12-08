import axios from "../../../setup/axios";


const fetchAllStoresService = () => {
    return axios({
        method: 'get',
        url: `/api/v1/public/stores/all`,
    });
}
const fetchStoreByIdService = (id) => {
    return axios({
        method: 'get',
        url: `/api/v1/public/stores/${id}`,
    });
}

export {
    fetchAllStoresService,
    fetchStoreByIdService,

}
