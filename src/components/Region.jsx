import CreateRegion from './CreateRegion'
import ListRegion from './ListRegion'

const Region = () => {
  return (
    <div>
      <h2 className="mt-5">Gestione Regioni di Teyvat</h2>
      <div className="container m-6 w-full flex">
        <CreateRegion />
        <ListRegion />
      </div>
    </div>
  )
}
export default Region
