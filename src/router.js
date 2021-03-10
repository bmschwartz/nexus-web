import React, { lazy, Suspense } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { QueryParamProvider, transformSearchStringJsonSafe } from 'use-query-params'
import * as apollo from 'services/apollo'

import Layout from 'layouts'

const routes = [
  // Home
  {
    exact: true,
    path: '/home',
    Component: lazy(() => import('pages/home')),
  },
  {
    exact: true,
    path: '/profile',
    Component: lazy(() => import('pages/profile')),
  },
  {
    exact: true,
    path: '/orders',
    Component: lazy(() => import('pages/orders')),
  },
  {
    exact: true,
    path: '/positions',
    Component: lazy(() => import('pages/positions')),
  },
  {
    exact: true,
    path: '/members',
    Component: lazy(() => import('pages/members')),
  },
  {
    exact: true,
    path: '/subscriptions',
    Component: lazy(() => import('pages/subscriptions')),
  },
  {
    exact: true,
    path: '/settings',
    Component: lazy(() => import('pages/settings')),
  },
  // Groups
  {
    exact: true,
    path: '/groups',
    memberPage: true,
    ownerTraderPage: false,
    Component: lazy(() => import('pages/groups/dashboard')),
  },
  {
    exact: true,
    path: '/groups/create',
    Component: lazy(() => import('pages/groups/create-group')),
  },
  {
    exact: true,
    path: '/groups/:groupId',
    Component: lazy(() => import('pages/groups/group-detail')),
  },

  // Auth Pages
  {
    path: '/login',
    Component: lazy(() => import('pages/auth/login')),
    exact: true,
  },
  {
    path: '/forgot-password',
    Component: lazy(() => import('pages/auth/forgot-password')),
    exact: true,
  },
  {
    path: '/register',
    Component: lazy(() => import('pages/auth/register')),
    exact: true,
  },
  {
    path: '/verify',
    Component: lazy(() => import('pages/auth/verify-code')),
    exact: true,
  },
  {
    path: '/lockscreen',
    Component: lazy(() => import('pages/auth/lockscreen')),
    exact: true,
  },
  {
    path: '/404',
    Component: lazy(() => import('pages/auth/404')),
    exact: true,
  },
  {
    path: '/500',
    Component: lazy(() => import('pages/auth/500')),
    exact: true,
  },
]

const queryStringifyOptions = {
  transformSearchString: transformSearchStringJsonSafe,
}

const mapStateToProps = ({ settings }) => ({
  routerAnimation: settings.routerAnimation,
})

const Router = ({ history, routerAnimation }) => {
  return (
    <ConnectedRouter history={history}>
      <QueryParamProvider ReactRouterRoute={Route} stringifyOptions={queryStringifyOptions}>
        <Layout>
          <Route
            render={state => {
              const { location } = state
              return (
                <SwitchTransition>
                  <CSSTransition
                    key={location.pathname}
                    appear
                    classNames={routerAnimation}
                    timeout={routerAnimation === 'none' ? 0 : 300}
                  >
                    <Switch location={location}>
                      <Route exact path="/" render={redirectFromSiteRoot} />
                      {routes.map(({ path, Component, exact }) => (
                        <Route
                          path={path}
                          key={path}
                          exact={exact}
                          render={() => {
                            return (
                              <div className={routerAnimation}>
                                <Suspense fallback={null}>
                                  <Component />
                                </Suspense>
                              </div>
                            )
                          }}
                        />
                      ))}
                      <Redirect to="/404" />
                    </Switch>
                  </CSSTransition>
                </SwitchTransition>
              )
            }}
          />
        </Layout>
      </QueryParamProvider>
    </ConnectedRouter>
  )
}

const redirectFromSiteRoot = () => {
  return <Redirect to={apollo.isAuthenticated() ? '/home' : '/login'} />
}

export default connect(mapStateToProps)(Router)
