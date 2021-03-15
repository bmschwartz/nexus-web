import React, { FC, useState } from 'react'
import { Group } from 'types/group'
import { Button, Input, notification } from 'antd'
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
      setTimeout(() => {
        window.location.reload()
      }, 1500)
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
    <>
      <div style={{ width: 800 }}>
        <Input.TextArea
          showCount
          disabled={saving}
          value={profileContent}
          onChange={e => setProfileContent(e.target.value)}
          maxLength={500}
          autoSize={{
            minRows: 10,
            maxRows: 20,
          }}
        />
        <div className="mt-4">
          <Button type="link" disabled={saving} onClick={onClickReset}>
            Reset
          </Button>
          <Button className="btn btn-primary" disabled={saving} onClick={onClickSave}>
            Save
          </Button>
        </div>
      </div>
    </>
  )
}
