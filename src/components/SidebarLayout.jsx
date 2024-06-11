import { Link } from 'react-router-dom'

const SidebarLayout = () => {
  return (
    <div className="bg-indigo-600 h-screen">
      <div className="flex flex-col text-xl	text-right  flex-end pe-10">
        <button className="text-right py-2 mt-10">
          <Link to="/reserved/region">Regioni e luoghi</Link>
        </button>
        <button className="text-right py-2">
          <Link to="#">Artefatti</Link>
        </button>
        <button className="text-right py-2">
          <Link to="#">Domini</Link>
        </button>
        <button className="text-right py-2">
          <Link to="#">Goal</Link>
        </button>
        <button className="text-right py-2">
          <Link to="#">Materiali</Link>
        </button>
        <button className="text-right py-2">
          <Link to="#">Armi</Link>
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
