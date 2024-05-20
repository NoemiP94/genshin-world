import { Link } from 'react-router-dom'

const AreaRiservata = () => {
  return (
    <>
      <div className="text-white">Gestione applicazione</div>
      <div>
        <button className="cust-button">
          <Link to="/region">Region</Link>
        </button>
      </div>
    </>
  )
}

export default AreaRiservata
