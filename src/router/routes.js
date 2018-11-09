const Home = () => import('src/pages/home')
const Login = () => import('src/pages/login')
export default [
  {
    path: '/',
    name: '',
    component: Home
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]
