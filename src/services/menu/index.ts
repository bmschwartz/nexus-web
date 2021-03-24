interface GroupDetailPageItem {
  page: string
  title: string
  memberOnly: boolean
}

const GROUP_DETAIL_PAGES: GroupDetailPageItem[] = [
  { page: 'dashboard', title: 'Dashboard', memberOnly: false },
  { page: 'orders', title: 'Orders', memberOnly: true },
  { page: 'positions', title: 'Positions', memberOnly: true },
  { page: 'exchanges', title: 'Exchanges', memberOnly: true },
  { page: 'subscription', title: 'Subscription', memberOnly: true },
]

const GROUP_DETAIL_MENU_ICON_MAP = {
  dashboard: 'fe fe-home',
  orders: 'fe fe-book-open',
  positions: 'fe fe-layers',
  exchanges: 'fe fe-server',
  subscription: 'fe fe-dollar-sign',
}

const menuItemForSelectedGroup = (groupId: string, pageItem: GroupDetailPageItem) => {
  const { title, page, memberOnly } = pageItem
  return {
    title,
    key: `${groupId}${page}`,
    icon: GROUP_DETAIL_MENU_ICON_MAP[page],
    url: `/groups/${groupId}/${page}`,
    memberOnly,
    memberPage: true,
    ownerTraderPage: false,
  }
}

const backToButton = (
  page: string,
  url: string,
  memberPage = true,
  memberOnly = false,
  ownerTraderPage = true,
) => ({
  title: `Back to ${page}`,
  key: `backTo${page}`,
  icon: 'fe fe-corner-up-left',
  url,
  backButton: true,
  memberPage,
  memberOnly,
  ownerTraderPage,
})

const groupDetailCategory = {
  title: 'Group Detail',
  category: true,
  memberPage: true,
  memberOnly: false,
  ownerTraderPage: false,
}

const groupDetailMenuItems = (groupId: string, isMember: boolean) => {
  const detailMenuItems = GROUP_DETAIL_PAGES.map(pageItem =>
    menuItemForSelectedGroup(groupId, pageItem),
  ).filter(page => (page.memberOnly ? isMember : true))

  return [backToButton('Groups', '/groups'), groupDetailCategory, ...detailMenuItems]
}

export function getMenuData(groupId: string, membershipId: string) {
  if (groupId) {
    return groupDetailMenuItems(groupId, !!membershipId)
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
