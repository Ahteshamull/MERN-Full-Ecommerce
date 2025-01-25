import React from 'react'
import { Outlet } from 'react-router'

const Dashboard = () => {
  return (
    <div className='w-full h-full p-2'>
      <Outlet/>
    </div>
  )
}

export default Dashboard