const Index = () => import(/* webpackChunkName: 'index' */ '../components/Index');
const Login = () => import(/* webpackChunkName: 'login' */ '../components/Login');
const Logs = () => import(/* webpackChunkName: 'logs' */ '../components/Logs');
const Profile = () => import(/* webpackChunkName: 'profile' */ '../components/Profile');

export default [
    { path: '/login', name: 'Login', component: Login, },
    { path: '/', name: 'Index', component: Index, meta: { requireAuth: true } },
    { path: '/logs', name: 'Logs', component: Logs, meta: { requireAuth: true } },
    { path: '/profile', name: 'Profile', component: Profile, meta: { requireAuth: true } },
];