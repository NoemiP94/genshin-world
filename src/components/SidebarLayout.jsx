import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../redux/action'

const SidebarLayout = () => {
  const dispatch = useDispatch()
  const [logOut, setLogOut] = useState(false)
  const navigate = useNavigate()
  const [isLogged, setIsLogged] = useState(false)
  const [role, setRole] = useState('')
  const location = useLocation()
  const handleLogout = () => {
    dispatch(logout())
    setLogOut(true)
  }

  useEffect(() => {
    if (logOut) {
      navigate('/')
    }
  }, [logOut, navigate])

  useEffect(() => {
    const logged = localStorage.getItem('isLogged') === 'true'
    setIsLogged(logged)
    console.log('isLogged:', logged)
    const roleFromLS = localStorage.getItem('role') || ''
    setRole(roleFromLS)
    console.log('role:', roleFromLS)
  }, [])

  return (
    <div className="bg-indigo-600 h-full">
      <div className="flex flex-col text-xl	text-right  flex-end pe-10">
        <button className="text-right py-2 mt-10">
          <Link to="/reserved/region">Regioni e luoghi</Link>
        </button>
        <button className="text-right py-2">
          <Link to="/reserved/artifacts">Artefatti</Link>
        </button>
        <button className="text-right py-2">
          <Link to="/reserved/domain">Domini</Link>
        </button>
        <button className="text-right py-2">
          <Link to="/reserved/goals">Obiettivi</Link>
        </button>
        <button className="text-right py-2">
          <Link to="/reserved/material">Materiali</Link>
        </button>
        <button className="text-right py-2">
          <Link to="/reserved/weapon">Armi</Link>
        </button>
        <button className="text-right py-2">
          <Link to="/reserved/enemy">Nemici</Link>
        </button>
        <button className="text-right py-2">
          <Link to="/reserved/character">Personaggi</Link>
        </button>
        <button className="text-right py-2">
          <Link to="/reserved/constellation">Costellazioni</Link>
        </button>
        <button className="text-right py-2">
          <Link to="/reserved/blog">Blog</Link>
        </button>
        {isLogged && role === 'ADMIN' ? (
          <button className="text-right py-2">
            <Link to="/reserved/user">User</Link>
          </button>
        ) : null}

        <button className="text-right py-10" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  )
}

export default SidebarLayout
