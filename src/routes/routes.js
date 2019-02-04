
const Welcome = () => import('../views/Welcome').then(m => m.default || m)
const Home = () => import('../views/Home').then(m => m.default || m)

let routes=[
    { path: '/',name:'welcome',component:Welcome},
    { path: '/home',name:'home',component:Home},
]
export  default routes




