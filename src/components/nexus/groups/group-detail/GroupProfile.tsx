import React, { FC, useState } from 'react'
import { notification } from 'antd'

import { Editor } from 'components/nexus/editor/EditorComponent'
import { Group } from 'types/group'
import * as apollo from 'services/apollo'

interface GroupProfileProps {
  group: Group
}

export const GroupProfile: FC<GroupProfileProps> = ({ group }) => {
  const [saving, setSaving] = useState<boolean>(false)
  const [profileContent, setProfileContent] = useState<string>(group.description ?? '')
  const preEditDescription = group.description ?? ''

  const onClickSave = async () => {
    setSaving(true)
    const { error, success } = await apollo.updateGroupDescription({
      groupId: group.id,
      description: profileContent,
    })
    setSaving(false)

    if (success) {
      notification.success({
        message: `Updated Profile`,
      })
      // setTimeout(() => {
      //   window.location.reload()
      // }, 1500)
    } else {
      notification.error({
        message: 'Error Updating Profile',
        description: error,
        duration: 3, // seconds
      })
    }
  }

  const onClickReset = () => {
    setProfileContent(preEditDescription)
  }

  return (
    <div style={{ width: 800 }}>
      <Editor
        disableSave={saving}
        disableReset={saving}
        onClickSave={onClickSave}
        onClickReset={onClickReset}
        onChange={setProfileContent}
        initialValue={profileContent}
      />
    </div>
  )
}
