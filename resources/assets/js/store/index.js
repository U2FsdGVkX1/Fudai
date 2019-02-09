import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store ({
    state: {
        userinfo: {
            name: '',
            coins: 0,
            conname: '',
            conaddress: '',
            conphone: '',
            logined: false
        }
    },
    mutations: {
        userinfo (state, newuserinfo) {
            state.userinfo = newuserinfo;
            state.userinfo.logined = true;
        }
    }
});

export default store;