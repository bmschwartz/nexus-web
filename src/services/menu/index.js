export default async function getMenuData() {
  return [
    {
      title: 'Home',
      key: 'home',
      icon: 'fe fe-home',
      url: '/home',
      memberPage: true,
      ownerTraderPage: true,
    },
    {
      title: 'Orders',
      key: 'orders',
      icon: 'fe fe-book-open',
      url: '/orders',
      memberPage: false,
      ownerTraderPage: true,
    },
    {
      title: 'Positions',
      key: 'positions',
      icon: 'fe fe-layers',
      url: '/positions',
      memberPage: false,
      ownerTraderPage: true,
    },
    {
      title: 'Members',
      key: 'members',
      icon: 'fe fe-users',
      url: '/members',
      memberPage: false,
      ownerTraderPage: true,
    },
    {
      title: 'Groups',
      key: 'groups',
      icon: 'fe fe-users',
      url: '/groups',
      memberPage: true,
      ownerTraderPage: false,
    },
    {
      title: 'Subscriptions',
      key: 'subscriptions',
      icon: 'fe fe-dollar-sign',
      url: '/subscriptions',
      memberPage: false,
      ownerTraderPage: true,
    },
    {
      title: 'Profile',
      key: 'profile',
      icon: 'fe fe-camera',
      url: '/profile',
      memberPage: false,
      ownerTraderPage: true,
    },
    {
      title: 'Settings',
      key: 'settings',
      icon: 'fe fe-settings',
      url: '/settings',
      memberPage: false,
      ownerTraderPage: true,
    },
  ]
}
