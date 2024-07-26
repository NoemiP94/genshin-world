import { Outlet } from 'react-router-dom'
import SidebarLayout from './SidebarLayout'
import Home from './Home'

const AreaRiservata = () => {
  return (
    <>
      <div className="flex w-full ">
        <div className="column-1 w-1/5 ">
          <SidebarLayout />
        </div>
        <div className="text-white column-11 w-4/5">
          <Outlet />
          <Home />
        </div>
      </div>
    </>
  )
}

export default AreaRiservata
