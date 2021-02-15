import React, { Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import PublicLayout from './Public'
import AuthLayout from './Auth'
import MainLayout from './Main'

const Layouts = {
  public: PublicLayout,
  auth: AuthLayout,
  main: MainLayout,
}

const mapStateToProps = ({ user }) => ({ user })

const Layout = ({ user, children, location: { pathname } }) => {
  // Layout Rendering
  const getLayout = () => {
    if (pathname === '/') {
      return 'public'
    }
    if (/^\/auth(?=\/|$)/i.test(pathname)) {
      return 'auth'
    }
    return 'main'
  }

  const Container = Layouts[getLayout()]
  const isUserAuthorized = user.authorized
  const isUserLoading = user.loading
  const isAuthLayout = getLayout() === 'auth'

  const BootstrappedLayout = () => {
    // show loader when user in check authorization process, not authorized yet and not on login pages
    if (isUserLoading && !isUserAuthorized && !isAuthLayout) {
      return null
    }
    // redirect to login page if current is not login page and user not authorized
    if (!isAuthLayout && !isUserAuthorized) {
      return <Redirect to="/login" />
    }
    // in other case render previously set layout
    return <Container>{children}</Container>
  }

  return (
    <Fragment>
      <Helmet titleTemplate="Trade Nexus | %s" title="Trade Nexus" />
      {BootstrappedLayout()}
    </Fragment>
  )
}

export default withRouter(connect(mapStateToProps)(Layout))
