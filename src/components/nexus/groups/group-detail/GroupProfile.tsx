import React, { FC } from 'react'
import { Group } from 'types/group'
import { Divider, Input } from 'antd'

interface GroupProfileProps {
  group: Group
}

export const GroupProfile: FC<GroupProfileProps> = ({ group }) => {
  return (
    <>
      <Divider orientation="left">
        <strong>Edit Profile</strong>
      </Divider>
      <div style={{ width: 600 }}>
        <Input.TextArea defaultValue={group.description} maxLength={500} />
      </div>
    </>
  )
}
