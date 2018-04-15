import routes from '<%- laroute_path %>';
import axios from 'axios';

class BaseRepository {

    /**
     * Construct the repository
     * We provide axios, all routes and the route helper
     * to the global repository context here
     */
    constructor() {
        this.routes = routes;
        this.route = routes.route;
        this.axios = axios;
    }

    /**
     * Standard get request
     *
     * @param {object} url
     * @param {object} data
     *
     * @return {Promise}
     */
    get(url, data) {
        return this.request('get', url, data);
    }

    /**
     * Standard patch request
     *
     * @param {object} url
     * @param {object} data
     *
     * @return {Promise}
     */
    patch(url, data) {
        return this.request('patch', url, data);
    }


    /**
     * Standard post request
     *
     * @param {object} url
     * @param {object} data
     *
     * @return {Promise}
     */
    post(url, data) {
        return this.request('post', url, data);
    }


    /**
     * Standard delete request
     *
     * @param {object} url
     * @param {object} data
     *
     * @return {Promise}
     */
    delete(url, data) {
        return this.request('delete', url, data);
    }


    /**
     * Standard request handler
     *
     * @param {object} method
     * @param {object} url
     * @param {object} data
     *
     * @return {Promise}
     */
    request(method, url, data) {
        return this.axios[method](url, data)
            .then(this.normaliseResponse)
    }

    /**
     * Normalise the response and return just the data
     *
     * @param { object } data
     * @return {string} data
     */
    normaliseResponse({ data }) {
        return data;
    }

}

export default BaseRepository;
