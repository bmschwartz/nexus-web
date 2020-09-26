import { history } from 'index'
import React, { FC, ReactNode } from 'react'
import { Helmet } from 'react-helmet'
import CreateGroupForm from 'components/nexus/groups/create-group/CreateGroupForm'
import { PageHeader } from 'antd'

interface CreateGroupPageProps {
  children?: ReactNode
}
const CreateGroupPage: FC<CreateGroupPageProps> = () => {
  return (
    <div>
      <Helmet title="Groups" />
      <div className="cui__utils__heading">
        <PageHeader
          className="site-page-header"
          onBack={() => history.push('/groups')}
          title="CREATE GROUP"
        />
      </div>
      <CreateGroupForm />
    </div>
  )
}

export default CreateGroupPage
