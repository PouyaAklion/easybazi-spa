
const Welcome = () => import('../views/site/Welcome').then(m => m.default || m)
const Home = () => import('../views/user/Home').then(m => m.default || m)
const Games = () => import('../views/site/Games').then(m => m.default || m)
const Game = () => import('../views/site/Game').then(m => m.default || m)
const NotFound = () => import('../views/site/404').then(m => m.default || m)


let routes=[
    { path: '/',name:'welcome',component:Welcome},
    { path: '/home',name:'home',component:Home},
		{ path: '/games',name:'games',component:Games},
		{ path: '/game/:name/:id/:action',name:'game',component:Game},
		{ path: '*',name:'notFound', component: NotFound }
]
export  default routes




