import { MenuItemType } from 'antd/es/menu/interface'

import { RouteObject, createBrowserRouter } from 'react-router-dom'

import App from '../App'

export type AdminRouterItem = RouteObject & {
  meta?: MenuItemType
  children?: AdminRouterItem[]
}

const loadRouteModules = async () => {
  const routeModuleFiles = import.meta.glob('../views/**/*.router.tsx', {
    eager: true,
    import: 'default',
  })
  const routeModules: AdminRouterItem[] = []

  for await (const [key, module] of Object.entries(routeModuleFiles)) {
    console.log('key = ', key, 'module = ', module)

    if (module) {
      const routes = Array.isArray(module) ? module : [module]
      routeModules.push(...routes)
    }
  }

  return routeModules
}

export const routes: AdminRouterItem[] = [...(await loadRouteModules())]

export default createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: routes,
  },
])
