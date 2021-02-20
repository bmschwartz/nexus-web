/* eslint-disable */
import { GetPendingMemberRequestsQuery } from '../../../graphql'
/* eslint-enable */

export interface PendingRequestTableRow {
  id: string
  username: string
}

export const createGroupRequestsTableData = (
  pendingRequestsResult: GetPendingMemberRequestsQuery | undefined,
): PendingRequestTableRow[] => {
  if (!pendingRequestsResult?.group?.members?.members) {
    return []
  }

  const { members } = pendingRequestsResult.group.members
  return members.map(
    (membership): PendingRequestTableRow => ({
      id: membership.id,
      username: membership.member.username,
    }),
  )
}
