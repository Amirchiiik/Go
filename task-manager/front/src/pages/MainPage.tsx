import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Closed from '../components/closed/Closed'
import InProgress from '../components/in-progress/InProgress'
import ToDo from '../components/to-do/ToDo'

const MainPage = () => {
  return (
    <div className="page main-page">
        <Navbar />

        <div className="all-lists">
          <Closed />
          <InProgress />
          <ToDo />
        </div>
      </div>
  )
}

export default MainPage