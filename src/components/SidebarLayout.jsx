import { Link } from 'react-router-dom'

const SidebarLayout = () => {
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
          <Link to="#">Goal</Link>
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
          <Link to="#">Personaggi</Link>
        </button>
        <button className="text-right py-2">
          <Link to="#">Blog</Link>
        </button>
        <button className="text-right py-10">
          <Link to="#">Log out</Link>
        </button>
      </div>
    </div>
  )
}

export default SidebarLayout
