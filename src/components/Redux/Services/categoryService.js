import axios from "../../../setup/axios";

const fetchAllCategoriesService = () => {
    return axios({
        method: 'get',
        url: `/api/v1/public/categories/all`,
    });
}

export {
    fetchAllCategoriesService,

}
