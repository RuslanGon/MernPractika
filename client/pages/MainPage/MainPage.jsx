import React from 'react'
import css from './MainPage.module.css'
import { Link } from 'react-router-dom'

const MainPage = () => {
  return (
    <div className={css.container}>
      <div className={css.content}>
        <h1>Explore the Camper Life</h1>
        <Link to='/camper' className={css.button}>Get Started</Link>
      </div>
    </div>
  )
}

export default MainPage
