const Home = () => import('src/pages/home')
const Login = () => import('src/pages/login')
const ThreeJs = () => import('src/pages/threejs/index')
const Example01 = () => import('src/pages/threejs/example/example01')
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
  },
  {
    path: '/threejs',
    name: 'threejs',
    component: ThreeJs,
    children: [
      {
        path: 'example-01',
        name: 'example01',
        component: Example01
      }
    ]
  }
]
