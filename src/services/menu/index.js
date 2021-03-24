const GROUP_DETAIL_PAGES = [
  ['dashboard', 'Dashboard'],
  ['orders', 'Orders'],
  ['positions', 'Positions'],
  ['exchanges', 'Exchanges'],
  ['subscription', 'Subscription'],
]

const GROUP_DETAIL_MENU_ICON_MAP = {
  dashboard: 'fe fe-home',
  orders: 'fe fe-book-open',
  positions: 'fe fe-layers',
  exchanges: 'fe fe-server',
  subscription: 'fe fe-dollar-sign',
}

const menuItemForSelectedGroup = (groupId, page, title) => {
  return {
    title,
    key: `${groupId}${page}`,
    icon: GROUP_DETAIL_MENU_ICON_MAP[page],
    url: `/groups/${groupId}/${page}`,
    memberPage: true,
    ownerTraderPage: false,
    groupDetailPage: true,
  }
}

const groupDetailMenuItems = groupId => {
  const detailItems = GROUP_DETAIL_PAGES.map(([page, title]) =>
    menuItemForSelectedGroup(groupId, page, title),
  )

  const backButton = {
    title: 'Back to Groups',
    key: 'backToGroups',
    icon: 'fe fe-corner-up-left',
    url: '/groups',
    backButton: true,
    memberPage: true,
    ownerTraderPage: false,
    groupDetailPage: false,
  }
  const groupDetailCategory = {
    title: 'Group Detail',
    category: true,
    memberPage: true,
    ownerTraderPage: false,
    groupDetailPage: true,
  }

  return [backButton, groupDetailCategory, ...detailItems]
}

export default function getMenuData(groupId) {
  if (groupId) {
    return groupDetailMenuItems(groupId)
  }

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
      title: 'Profile',
      key: 'profile',
      icon: 'fe fe-camera',
      url: '/profile',
      memberPage: false,
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
      icon: 'fe fe-globe',
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
  ]
}
