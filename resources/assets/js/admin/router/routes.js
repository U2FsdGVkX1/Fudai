const Index = () => import(/* webpackChunkName: 'admin/index' */ '../components/Index')
const Users = () => import(/* webpackChunkName: 'admin/users' */ '../components/Users')
const Stores = () => import(/* webpackChunkName: 'admin/stores' */ '../components/Stores')

export default [
    { path: '/admin/', name: 'Index', component: Index },
    { path: '/admin/users', name: 'Users', component: Users },
    { path: '/admin/stores', name: 'Stores', component: Stores }
];