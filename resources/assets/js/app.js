import './bootstrap';
import store from './store';
import router from './router';
import App from './App.vue';
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
const app = new Vue({
    el: '#app',
    components: { App },
    template: '<App/>',
    store,
    router
});
