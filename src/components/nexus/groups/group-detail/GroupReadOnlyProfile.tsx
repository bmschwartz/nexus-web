import React from 'react'
import marked from 'marked'
import DOMPurify from 'dompurify'

/* eslint-disable */
import { Group } from '../../../../types/group'
/* eslint-enable */

interface GroupReadOnlyProfileProps {
  group: Group
}

export const GroupReadOnlyProfile = ({ group }: GroupReadOnlyProfileProps) => {
  const groupProfile = DOMPurify.sanitize(group.description ?? '')

  return (
    <div
      className="pt-3"
      dangerouslySetInnerHTML={{
        __html: marked(groupProfile),
      }}
    />
  )
}
