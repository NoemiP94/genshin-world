import { Outlet } from 'react-router-dom'
import SidebarLayout from './SidebarLayout'

const AreaRiservata = () => {
  return (
    <>
      <div className="flex w-full h-screen">
        <div className="column-1 w-1/5 ">
          <SidebarLayout />
        </div>
        <div className="text-white column-11 w-4/5">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default AreaRiservata
