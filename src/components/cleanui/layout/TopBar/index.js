import React from 'react'
import UserMenu from './UserMenu'
import style from './style.module.scss'

const TopBar = () => {
  return (
    <div className={style.topbar}>
      <div className="mr-1">
        <UserMenu />
      </div>
    </div>
  )
}

export default TopBar
