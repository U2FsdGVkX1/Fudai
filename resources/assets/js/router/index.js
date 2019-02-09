import routes from './routes';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    routes
});
router.beforeEach((to, from, next) => {
    if (!to.meta.requireAuth || router.app.$store.state.userinfo.logined) {
        next();
    } else {
        axios.get('/api/users').then((res) => {
            router.app.$store.commit('userinfo', res.data);
            next();
        }).catch((res) => {
            next({
                name: 'Login'
            });
        });
    }
});

export default router;