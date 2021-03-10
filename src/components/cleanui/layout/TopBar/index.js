import React from 'react'
import UserMenu from './UserMenu'
import style from './style.module.scss'

const TopBar = () => {
  return (
    <div className={style.topbar}>
      <div className="ml-auto">
        <UserMenu />
      </div>
    </div>
  )
}

export default TopBar
