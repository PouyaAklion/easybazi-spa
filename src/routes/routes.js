
const Welcome = () => import('../views/site/Welcome').then(m => m.default || m)
const Home = () => import('../views/user/Home').then(m => m.default || m)

let routes=[
    { path: '/',name:'welcome',component:Welcome},
    { path: '/home',name:'home',component:Home},
]
export  default routes




