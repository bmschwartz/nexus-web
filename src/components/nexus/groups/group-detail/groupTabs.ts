import { MembershipRole } from 'types/membership'

export interface Tab {
  key: string
  name: string
}

export enum TabKey {
  MemberDashboard = 'memberDashboard',
  MemberOrders = 'memberOrders',
  MemberPositions = 'memberPositions',
  MemberExchanges = 'memberExchanges',
  MemberMembership = 'membershipTab',
  MemberSubscription = 'memberSubscription',
  GroupDashboard = 'groupDashboard',
  GroupOrders = 'groupOrders',
  GroupPositions = 'groupPositions',
  GroupMembers = 'groupMembers',
  GroupProfile = 'groupProfile',
  GroupSettings = 'groupSettings',
  GroupRequests = 'groupRequests',
}

export const availableTabs = (userRole: MembershipRole): Tab[] => {
  const allTabs: { key: TabKey; name: string; requiredRole: MembershipRole[] }[] = [
    // Member tabs
    // { key: TabKey.MemberDashboard, name: 'Dashboard', requiredRole: [MembershipRole.Member] },
    { key: TabKey.MemberOrders, name: 'Orders', requiredRole: [MembershipRole.Member] },
    { key: TabKey.MemberPositions, name: 'Positions', requiredRole: [MembershipRole.Member] },
    { key: TabKey.MemberExchanges, name: 'Exchanges', requiredRole: [MembershipRole.Member] },
    // { key: TabKey.MemberMembership, name: 'Membership', requiredRole: [MembershipRole.Member] },
    { key: TabKey.MemberSubscription, name: 'Subscription', requiredRole: [MembershipRole.Member] },

    // Group admin/trader tabs
    // {
    //   key: TabKey.GroupDashboard,
    //   name: 'Dashboard',
    //   requiredRole: [MembershipRole.Admin, MembershipRole.Trader],
    // },
    {
      key: TabKey.GroupOrders,
      name: 'Orders',
      requiredRole: [MembershipRole.Admin, MembershipRole.Trader],
    },
    {
      key: TabKey.GroupPositions,
      name: 'Positions',
      requiredRole: [MembershipRole.Admin, MembershipRole.Trader],
    },
    {
      key: TabKey.GroupMembers,
      name: 'Members',
      requiredRole: [MembershipRole.Admin],
    },
    { key: TabKey.GroupRequests, name: 'Requests', requiredRole: [MembershipRole.Admin] },
    {
      key: TabKey.GroupProfile,
      name: 'Profile',
      requiredRole: [MembershipRole.Admin, MembershipRole.Trader],
    },
    { key: TabKey.GroupSettings, name: 'Settings', requiredRole: [MembershipRole.Admin] },
  ]

  return allTabs
    .filter(tab => tab.requiredRole.includes(userRole))
    .map(({ key, name }) => ({
      key,
      name,
    }))
}
