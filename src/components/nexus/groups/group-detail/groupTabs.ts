import { MembershipRole } from 'types/membership'

export interface Tab {
  key: string
  name: string
}

export const availableTabs = (userRole: MembershipRole): Tab[] => {
  const allTabs: { key: string; name: string; requiredRole: MembershipRole[] }[] = [
    // Member tabs
    { key: 'memberDashboard', name: 'Dashboard', requiredRole: [MembershipRole.Member] },
    { key: 'memberOrders', name: 'Orders', requiredRole: [MembershipRole.Member] },
    { key: 'memberPositions', name: 'Positions', requiredRole: [MembershipRole.Member] },
    { key: 'memberSettings', name: 'Settings', requiredRole: [MembershipRole.Member] },

    // Group tabs
    {
      key: 'groupDashboard',
      name: 'Dashboard',
      requiredRole: [MembershipRole.Admin, MembershipRole.Trader],
    },
    {
      key: 'groupMembers',
      name: 'Members',
      requiredRole: [MembershipRole.Admin, MembershipRole.Trader],
    },
    {
      key: 'groupOrders',
      name: 'Orders',
      requiredRole: [MembershipRole.Admin, MembershipRole.Trader],
    },
    {
      key: 'groupPositions',
      name: 'Positions',
      requiredRole: [MembershipRole.Admin, MembershipRole.Trader],
    },
    {
      key: 'groupProfile',
      name: 'Profile',
      requiredRole: [MembershipRole.Admin, MembershipRole.Trader],
    },
    { key: 'groupSettings', name: 'Settings', requiredRole: [MembershipRole.Admin] },
  ]

  return allTabs
    .filter(tab => tab.requiredRole.includes(userRole))
    .map(({ key, name }) => ({
      key,
      name,
    }))
}
