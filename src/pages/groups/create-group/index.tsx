import React, { FC, ReactNode } from 'react'
import { Helmet } from 'react-helmet'
import CreateGroupForm from 'components/nexus/groups/CreateGroupForm'

interface CreateGroupPageProps {
  children?: ReactNode
}
const CreateGroupPage: FC<CreateGroupPageProps> = () => {
  return (
    <div>
      <Helmet title="Groups" />
      <div className="cui__utils__heading">
        <strong>Create Group</strong>
      </div>
      <CreateGroupForm />
    </div>
  )
}

export default CreateGroupPage
