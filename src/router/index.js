import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import DashBoard from '@/views/DashBoard.vue'
import Login from '@/views/Login.vue'

const routes= [
    {path: '/', name: 'Home', component: Home},
    {path: '/about', name: 'About', component: About},
    {path: '/admindashboard', name: 'DashBoard', component: DashBoard, meta:{requiresAuth:true}},
    {path: '/login', name: 'LogIn', component: Login},
]

export const router = createRouter({
    history:createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    //const isLoggedIn = checkIfUserIsLoggedIn(); // Implementa tu propia lógica de verificación de autenticación
    const isLoggedIn = localStorage.getItem('admin');
    if (to.meta.requiresAuth && isLoggedIn !== 'access') {
      next('/login'); // Redirige al inicio de sesión si se requiere autenticación y el usuario no está autenticado
    } else {
      next(); // Continúa la navegación normalmente
    }
  });