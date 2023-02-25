
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('pages/LoginPage.vue'),
        meta: {
          middleware: 'guest',
        }
      }
    ]
  },
  {
    path: '/home',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        name: 'HomeAuth',
        component: () => import('pages/HomeAuthPage.vue'),
        meta: {
          middleware: 'auth',
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'ErrorNotFound',
    component: () => import('pages/ErrorNotFound.vue'),
    meta: {
      middleware: 'guest',
    }
  }
]

export default routes
