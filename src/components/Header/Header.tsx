import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/logo_nyt.svg'

import './styles.scss'

const Header = () => {
  return (
    <header className="app--header">
      <Link to="/" title="Click to visit the homepage">
        <img src={logo} alt="New York Times Logo" />
      </Link>
    </header>
  )
}

export default Header
