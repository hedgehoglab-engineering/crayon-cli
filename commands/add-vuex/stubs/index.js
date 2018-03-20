import Vuex from 'vuex';
Vue.use(Vuex);

import example from './modules/example';

export default new Vuex.store({
    modules: {
        // A default boilerplate module
        example,
    },
});