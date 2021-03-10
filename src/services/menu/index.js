export default async function getMenuData() {
  return [
    {
      title: 'Home',
      key: 'home',
      icon: 'fe fe-home',
      url: '/home',
      // roles: ['admin'], // set user roles with access to this route
    },
    {
      title: 'Profile',
      key: 'profile',
      icon: 'fe fe-menu',
      url: '/profile',
    },
    {
      title: 'Orders',
      key: 'orders',
      icon: 'fe fe-menu',
      url: '/orders',
    },
    {
      title: 'Positions',
      key: 'positions',
      icon: 'fe fe-menu',
      url: '/positions',
    },
    {
      title: 'Members',
      key: 'members',
      icon: 'fe fe-menu',
      url: '/members',
    },
    {
      title: 'Groups',
      key: 'groups',
      icon: 'fe fe-menu',
      url: '/groups',
    },
    {
      title: 'Subscriptions',
      key: 'subscriptions',
      icon: 'fe fe-menu',
      url: '/subscriptions',
    },
    {
      title: 'Settings',
      key: 'settings',
      icon: 'fe fe-menu',
      url: '/settings',
    },
  ]
}
