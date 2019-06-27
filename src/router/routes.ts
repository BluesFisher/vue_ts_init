const routes = [
    {
        path: '/',
        name: 'home',
        meta: {
            requireAuth: true // 进入页面前判断是否需要登陆
        },
        component: () => import(/* webpackChunkName: "about" */ '@/pages/Home.vue')
    }
];

export default routes;
